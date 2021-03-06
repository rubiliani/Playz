'use strict';

angular.module('PlayzApp')
    .controller('notificationCtrl', function($scope, $http, $rootScope, $location,DB_queries,$timeout,growl) {
        console.log("notif controller")
        $scope.usersDevices = [];

		$rootScope.getNotifications=function(){
			DB_queries.getNotifications().then(function(data){
				$rootScope.notifications=data;
			})
		}

        //TODO remove from invited users and remove the notification from the user list 
        //and update the registered users in both cases Remove OR Add
        $scope.acceptNotification = function(index,eventId,notificationId){
        	console.log("event id ",eventId);
            console.log("user id ",$rootScope.user._id);
            console.log("notif id ",notificationId);
            console.log("index ",index);
            DB_queries.joinEvent(eventId).then(function(){
                //$scope.notifications.splice(index, 1);
                console.log("joined");
                $scope.deleteNotification(index,eventId,notificationId);

                DB_queries.getCreatorDevices($rootScope.notifications[index].notification.creator._id).then(function(data){
                    console.log(data);

                    data.users.forEach(function (user, i){
                            user.devices.forEach(function(id,i){
                                $scope.usersDevices.push(id._id);
                            })
                        });

                    var msg = $rootScope.user.name+" accepted the invitation to "+$rootScope.notifications[index].notification.event.sportType+" event";
                    
                    DB_queries.sendNotifications($scope.usersDevices,msg).then(function(){
                             console.log("sendNotifications");
                    })
                       
                    

                })
            })
        }

        $scope.deleteNotification = function(index,eventId,notificationId){
        	console.log("delete id ",eventId,$rootScope.user._id,notificationId);
            DB_queries.deleteNotification(notificationId,$rootScope.user._id).then(function(){
                $rootScope.notifications.splice(index, 1);
                console.log("deleted");
            })
        }

        $rootScope.$on('newNotificationFromWS', function(notification, msg) {
                //growl.warning("This adds a warn message", {title: 'Warning!'});
                growl.info("New invitation notification for "+msg.event.eventTitle+" event", {title: 'New Invitation'});
                //growl.success("This adds a success message"); //no title here
                //growl.error("This adds a error message", {title: 'ALERT WE GOT ERROR'});
        });
    });

