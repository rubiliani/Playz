'use strict';

angular.module('PlayzApp')
    .controller('registerCtrl', function($scope, $http, $rootScope, $location,DB_queries, $window, $document) {
        console.log("register controller")
        $scope.register={
            id:$rootScope.user.id,
            birthday:($rootScope.user.birthday) ? new Date($rootScope.user.birthday) : new Date(),
            about:$rootScope.user.about,
            hometown:$rootScope.user.hometown
        };
        $scope.options = {
            types: '(cities)',
            //country: 'ca',
            typesEnabled: true,
            boundsEnabled: true,
            componentEnabled: true,
            watchEnter: true
        }
        $scope.updateUser=function(){
            if ($scope.register.hometown.data) {
                var lat = ($scope.register.hometown.data.geometry.location.lat===typeof 'function')?$scope.register.hometown.data.geometry.location.lat():$scope.register.hometown.data.geometry.location.lat;
                var lng = ($scope.register.hometown.data.geometry.location.lng===typeof 'function')?$scope.register.hometown.data.geometry.location.lng():$scope.register.hometown.data.geometry.location.lng;
                $scope.register.hometown.name = $scope.register.hometown.data.formatted_address;
                $scope.register.hometown.latitude = lat;
                $scope.register.hometown.longitude = lng;
                console.log($scope.register.hometown)
            }

           DB_queries.updateUser($scope.register).then(function(user){
               console.log('register - update user',user);
               $rootScope.user=user;
                $location.url('/')
           })
        }

        $scope.getBirthday=function(){
            if (user.birthday){
                register.birthday = new Date(user.birthday)
            }
        }

        $scope.show_profile_completeness=function(){

        }
    });
