'use-strict';
/**
 * https://github.com/GoDisco/ngFacebook
 */
angular.module('PlayzApp.services')
    .factory('DB_queries', function($http, $q, $rootScope, $localStorage){
        var getEvents = function(){
            var deferred = $q.defer();
            return $http.get($rootScope.app.domain+'events/other/'+$rootScope.user.id)
                 .success(function(data){
                     console.log("success",data)
                     deferred.resolve(data);
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