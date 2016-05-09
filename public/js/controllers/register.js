'use strict';

angular.module('PlayzApp')
    .controller('registerCtrl', function($scope, $http, $rootScope, $location,DB_queries, $window, $document) {
        console.log("register controller")
        $scope.register={
            id:$rootScope.user.id,
            birthday: new Date(),
            about:$rootScope.user.about,
            hometown:{
                name:$rootScope.user.hometown.name,
                latitude:'',
                longitude:'',
                data:{}
            }
        };

        $scope.updateUser=function(){
            $scope.register.hometown.name=$scope.register.hometown.data.formatted_address;
            $scope.register.hometown.latitude=$scope.register.hometown.data.geometry.location.lat()
            $scope.register.hometown.longitude=$scope.register.hometown.data.geometry.location.lng()

           DB_queries.updateUser($scope.register).then(function(user){
               console.log('register - update user',user)
                $location.url('/')
           })
        }

        $scope.getBirthday=function(){
            if (user.birthday){
                register.birthday = new Date(user.birthday)
            }
        }
    });
