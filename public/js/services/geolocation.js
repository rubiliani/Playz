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

    var getDistanceFromPosition = function () {
        //console.log($scope.user)
         var deferred = $q.defer();
        var origin1 = new google.maps.LatLng($rootScope.user.hometown.latitude,$rootScope.user.hometown.longitude);
        //var origin1 = "Hod Hasharon"
        var destinationA = "Tel Aviv";
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin1],
            destinations: [destinationA],
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
