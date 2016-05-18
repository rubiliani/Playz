'use-strict';
/**
 * https://github.com/GoDisco/ngFacebook
 */
angular.module('PlayzApp.services')
    .factory('DB_queries', function ($http, $q, $rootScope, $localStorage) {
        var _getEvents = function () {
            var deferred = $q.defer();
            $http.get($rootScope.app.domain + 'events/other/' + $rootScope.user.id)
                .success(function (data) {
                    console.log("get events success", data)
                    deferred.resolve(data);
                }).error(function (err) {
                console.log("get events err", err)
                deferred.reject(err);
            })
                ['finally'](function () {

            });
            return deferred.promise;
        }

        var _updateUser = function (user) {
            var deferred = $q.defer();
            $http.post($rootScope.app.domain + 'users/update_user', {user: user})
                .success(function (data) {
                    console.log("update user success", data.user)
                    if (data.newUser) {
                        data.user.newUser = data.newUser;
                    }
                    deferred.resolve(data.user);
                }).error(function (err) {
                console.log("update user err", err)
                deferred.reject(err);
            })
                ['finally'](function () {

            });
            return deferred.promise;
        }
        var _getUpcomingEvents = function () {
            var deferred = $q.defer();
            $http.post($rootScope.app.domain + 'events/getUpcomingEvents')
                .success(function (data) {
                    console.log("getUpcomingEvents success", data)
                    deferred.resolve(data);
                }).error(function (err) {
                console.log("getUpcomingEvents err", err)
                deferred.reject(err);
            })
                ['finally'](function () {

            });
            return deferred.promise;
        }
        var _getPastEvents = function () {
            var deferred = $q.defer();
            $http.post($rootScope.app.domain + 'events/getPastEvents')
                .success(function (data) {
                    console.log("getPastEvents success", data)
                    deferred.resolve(data);
                }).error(function (err) {
                console.log("getPastEvents err", err)
                deferred.reject(err);
            })
                ['finally'](function () {

            });
            return deferred.promise;
        }

        var _getTodayEvents = function () {
            var deferred = $q.defer();
            $http.post($rootScope.app.domain + 'events/getTodayEvents')
                .success(function (data) {
                    console.log("getPastEvents success", data)
                    deferred.resolve(data);
                }).error(function (err) {
                console.log("getPastEvents err", err)
                deferred.reject(err);
            })
                ['finally'](function () {

            });
            return deferred.promise;
        }
        var _getTomorrowEvents = function () {
            var deferred = $q.defer();
            $http.post($rootScope.app.domain + 'events/getTomorrowEvents')
                .success(function (data) {
                    console.log("getPastEvents success", data)
                    deferred.resolve(data);
                }).error(function (err) {
                console.log("getPastEvents err", err)
                deferred.reject(err);
            })
                ['finally'](function () {

            });
            return deferred.promise;
        }

        var _getAllEvents = function (filter) {
            var deferred = $q.defer();
            $http.post($rootScope.app.domain + 'events/getAllEvents',filter)
                .success(function (data) {
                    console.log("getAllEvents success", data)
                    deferred.resolve(data.events);
                }).error(function (err) {
                console.log("getAllEvents err", err)
                deferred.reject(err);
            })
                ['finally'](function () {

            });
            return deferred.promise;
        }

        var _getNegotiableEvents = function () {
            var deferred = $q.defer();
            $http.post($rootScope.app.domain + 'events/getNegotiableEvents')
                .success(function (data) {
                    console.log("getPastEvents success", data)
                    deferred.resolve(data);
                }).error(function (err) {
                console.log("getPastEvents err", err)
                deferred.reject(err);
            })
                ['finally'](function () {

            });
            return deferred.promise;
        }

        var _createEvent = function(event){
            var deferred = $q.defer();
            $http.post($rootScope.app.domain+'events/createEvent',{event:event})
                .success(function(data){
                    console.log("create event success",data)
                    
                    deferred.resolve(data.event);
                }).error(function(err){
                    console.log("create event err",err)
                    deferred.reject(err);
            })
            ['finally'](function() {

            });
            return deferred.promise;
        }

        var _inviteFriend = function(event,fbId){
            var deferred = $q.defer();
            $http.post($rootScope.app.domain+'notifications/createNotification',{event:event,id:fbId})
                .success(function(data){
                    console.log("invite success",data)
                    
                    deferred.resolve(data.event);
                }).error(function(err){
                    console.log("invite err",err)
                    deferred.reject(err);
            })
            ['finally'](function() {

            });
            return deferred.promise;
        }

        var _getNotifications = function(){
            var deferred = $q.defer();
            $http.post($rootScope.app.domain+'notifications/getNotifications')
                .success(function(data){
                    console.log("getNotifications success",data)
                    deferred.resolve(data);
                }).error(function(err){
                console.log("getNotifications err",err)
                deferred.reject(err);
            })
                ['finally'](function() {

            });
            return deferred.promise;
        }

        var _getEventById = function(eid){
            var deferred = $q.defer();
            $http.post($rootScope.app.domain+'events/getEventById',{eventid:eid})
                .success(function(data){
                    console.log("getEventById success",data)
                    deferred.resolve(data);
                }).error(function(err){
                console.log("getEventById err",err)
                deferred.reject(err);
            })
                ['finally'](function() {

            });
            return deferred.promise;
        }

        return {
            getEvents: _getEvents,
            updateUser: _updateUser,
            getUpcomingEvents: _getUpcomingEvents,
            getPastEvents: _getPastEvents,
            getTodayEvents: _getTodayEvents,
            getTomorrowEvents: _getTomorrowEvents,
            getNegotiableEvents: _getNegotiableEvents,
            createEvent:_createEvent,
            inviteFriend: _inviteFriend,
            getNotifications: _getNotifications,
            getAllEvents:_getAllEvents,
            getEventById:_getEventById
        }
    })