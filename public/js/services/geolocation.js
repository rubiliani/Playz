'use strict';

angular.module('PlayzApp.services')
.factory('geolocation', function ($q, $window,$http,$rootScope) {

    var getCurrentPosition = function () {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }

        return deferred.promise;
    }

    var getDistanceFromPosition = function (home,event) {
        //console.log($scope.user)
        
         var deferred = $q.defer();
        var service = new google.maps.DistanceMatrixService();
       // var origin1 = new google.maps.LatLng($rootScope.user.hometown.latitude,$rootScope.user.hometown.longitude);
       
       var userHome = new google.maps.LatLng(home.latitude, home.longitude);

       var dests = [];
    
        for (var i = 0; i < event.length; i++) {
            dests.push(new google.maps.LatLng(event[i].location.latitude, event[i].location.longitude));
          }

            service.getDistanceMatrix(
            {
              origins: [userHome],
              destinations: dests,
              travelMode: google.maps.TravelMode.DRIVING,
            }, callback);

            function callback(response, status) {
              console.log(response);
              deferred.resolve(response);
            }
          

        
        
         return deferred.promise;
    }

    return {
        getCurrentPosition: getCurrentPosition,
        getDistanceFromPosition: getDistanceFromPosition
    };
});
