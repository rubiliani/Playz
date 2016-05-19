'use-strict';
/**
 * https://github.com/GoDisco/ngFacebook
 */
angular.module('PlayzApp.services')
    .factory('Sockets', function ($rootScope,$timeout) {
        var socket;
        var _connect=function(url,uid) {
            socket = io(url + uid);

            socket.on('on user connected', function (msg) {
                console.log(msg)
                socket.emit('ping','ping');
            });

            socket.on('ping', function (msg) {
                console.log(msg)
            });

            socket.on('newEventReceived', function (notification) {
                console.log("newEventReceived", notification)
                if ($rootScope.notifications){
                    $rootScope.notifications.push(notification);
                    $rootScope.$apply();
                }
            });

        }

        return {
            connect:_connect
        }
    })