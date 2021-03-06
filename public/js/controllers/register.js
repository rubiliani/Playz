'use strict';

angular.module('PlayzApp')
    .controller('registerCtrl', function($scope, $http, $rootScope, $location,DB_queries, $window, $document) {
        console.log("register controller")
        if ($rootScope.user) {
            $scope.register = {
                id: $rootScope.user.id,
                birthday: new Date($rootScope.user.birthday),
                about: $rootScope.user.about,
                hometown: $rootScope.user.hometown
            };
        }
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
                console.log($scope.register.hometown.data)
                var lat = (typeof $scope.register.hometown.data.geometry.location.lat === 'function')?$scope.register.hometown.data.geometry.location.lat():$scope.register.hometown.data.geometry.location.lat;
                var lng = (typeof $scope.register.hometown.data.geometry.location.lng === 'function')?$scope.register.hometown.data.geometry.location.lng():$scope.register.hometown.data.geometry.location.lng;
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
            if ($rootScope.user){
                if (!$rootScope.user.hometown.name || !$rootScope.user.birthday){
                    return true
                }
                else{
                    return false;
                }
            }
        }
    });
