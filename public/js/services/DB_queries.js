'use-strict';
/**
 * https://github.com/GoDisco/ngFacebook
 */
angular.module('PlayzApp.services')
    .factory('DB_queries', function($http, $q, $rootScope, $localStorage){
        var getEvents = function(){
            var deferred = $q.defer();
            return $http.post($rootScope.app.domain+'abc')
                 .success(function(data){
                     console.log("success",data)
                     deferred.resolve(console.log("success",data));
                 }).error(function(err){
                    console.log("err",err)
                    deferred.reject(err);
                })
                ['finally'](function() {

                });
        }

        return{
            getEvents:getEvents
        }
    })