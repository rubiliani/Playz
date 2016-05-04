'use-strict';
/**
 * https://github.com/GoDisco/ngFacebook
 */
angular.module('PlayzApp.services')
.factory('DB_queries', function($http, $q, $rootScope, $localStorage){
    var _getEvents = function(data){
        //TODO activate loader
        console.log('events received');
        var deferred = $q.defer();
         return $http.get($rootScope.app.domain+'abc')
             .success(function(response){
                 console.log("success",response)
                 deferred.resolve(response);
             }).error(function(err){
             console.log("err",err)
             deferred.reject(err);
         })
         ['finally'](function() {
             //TODO deactivate loader
             console.log('finally')
         });
    }


    return{
        getEvents:_getEvents
    }
})