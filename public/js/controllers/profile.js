'use strict';

angular.module('PlayzApp')
    .controller('profileCtrl', function ($scope, $http, $rootScope, $location, DB_queries) {
        console.log("profile controller");
        $scope.disable = true;
        if ($rootScope.user) {
            $scope.profile = {
                id: $rootScope.user.id,
                birthday: new Date($rootScope.user.birthday),
                hometown: $rootScope.user.hometown
            };
        }
        $scope.options = {
            types: '(cities)',
            typesEnabled: true,
            boundsEnabled: true,
            componentEnabled: true,
            watchEnter: true
        }
        $scope.updateUser = function () {
            if ($scope.profile.hometown.data) {
                var lat = ($scope.profile.hometown.data.geometry.location.lat === typeof 'function') ? $scope.profile.hometown.data.geometry.location.lat() : $scope.profile.hometown.data.geometry.location.lat;
                var lng = ($scope.profile.hometown.data.geometry.location.lng === typeof 'function') ? $scope.profile.hometown.data.geometry.location.lng() : $scope.profile.hometown.data.geometry.location.lng;
                $scope.profile.hometown.name = $scope.profile.hometown.data.formatted_address;
                $scope.profile.hometown.latitude = lat;
                $scope.profile.hometown.longitude = lng;
                console.log($scope.profile.hometown)
            }

            DB_queries.updateUser($scope.profile).then(function (user) {
                console.log('profile - update user', user);
                $rootScope.user = user;
                $scope.changeDisable();
            })
        }
        $scope.createNewEvent = function () {
            $location.url('/create')
        }

        $scope.changeDisable=function(){
            $scope.disable=!$scope.disable;
        }

        $scope.tabChanged=function(type){
            if (type=="upcoming"){
                $scope.upcomingEvents=["upcoming avishay","upcoming hajbi"]

                //DB_queries.getUpcomingEvents().then(function(data){
                //    $scope.upcomingEvents=data.events;
                //})
            }
            else if (type=="past"){
                $scope.pastEvents=["past avishay","past hajbi"]

                //DB_queries.getPastEvents().then(function(data){
                //    $scope.pastEvents=data.events;
                //})
            }
        }
        $scope.tabChanged('upcoming')
    });