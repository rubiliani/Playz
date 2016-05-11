'use-strict';
/**
 * https://github.com/GoDisco/ngFacebook
 */
angular.module('PlayzApp.services')
    .factory('DB_queries', function($http, $q, $rootScope, $localStorage){
        var _getEvents = function(){
            var deferred = $q.defer();
            $http.get($rootScope.app.domain+'events/other/'+$rootScope.user.id)
                 .success(function(data){
                     console.log("get events success",data)
                     deferred.resolve(data);
                 }).error(function(err){
                    console.log("get events err",err)
                    deferred.reject(err);
                })
                ['finally'](function() {

                });
            return deferred.promise;
        }

        var _updateUser = function(user){
            var deferred = $q.defer();
            $http.post($rootScope.app.domain+'users/update_user',{user:user})
                .success(function(data){
                    console.log("update user success",data.user)
                    if (data.newUser){
                        data.user.newUser=data.newUser;
                    }
                    deferred.resolve(data.user);
                }).error(function(err){
                    console.log("update user err",err)
                    deferred.reject(err);
            })
            ['finally'](function() {

            });
            return deferred.promise;
        }
        var _getUpcomingEvents = function(){
            var deferred = $q.defer();
            $http.post($rootScope.app.domain+'events/getUpcomingEvents')
                .success(function(data){
                    console.log("getUpcomingEvents success",data)
                    deferred.resolve(data);
                }).error(function(err){
                console.log("getUpcomingEvents err",err)
                deferred.reject(err);
            })
                ['finally'](function() {

            });
            return deferred.promise;
        }
        var _getPastEvents = function(){
            var deferred = $q.defer();
            $http.post($rootScope.app.domain+'events/getPastEvents')
                .success(function(data){
                    console.log("getPastEvents success",data)
                    deferred.resolve(data);
                }).error(function(err){
                console.log("getPastEvents err",err)
                deferred.reject(err);
            })
                ['finally'](function() {

            });
            return deferred.promise;
        }
        return{
            getEvents:_getEvents,
            updateUser:_updateUser,
            getUpcomingEvents:_getUpcomingEvents,
            getPastEvents:_getPastEvents
        }
    })