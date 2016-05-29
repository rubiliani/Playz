'use-strict';
/**
 * https://github.com/GoDisco/ngFacebook
 */
angular.module('PlayzApp.services')
    .factory('Sockets', function ($rootScope,$timeout) {
        var socket;
        var that= this;
        var _connect=function(url,uid) {
            socket = io(url + uid);

            socket.on('connect', function(){console.log('WS ready and connected')});
            socket.on('disconnect', function(){
                console.log('WS disconnected');
                socket = io(url + uid);
            });

            socket.on('on user connected', function (msg) {
                console.log(msg)
            });

            socket.on('ping', function (msg) {
                console.log(msg)
                socket.emit('client ping','ping from client'+$rootScope.user._id);

            });

            socket.on('newEventReceived', function (notification) {
                console.log("newEventReceived", notification)
                if ($rootScope.notifications){
                    $rootScope.notifications.push({notification:notification});
                    $rootScope.$broadcast('newNotificationFromWS',notification);
                    $rootScope.$apply();
                }
            });

            socket.on('newMessageReceived', function (message) {
                console.log("newMessageReceived", message)
                $rootScope.$broadcast('newMessageReceivedFromWS',message);
            });

        }

        return {
            connect:_connect
        }
    })