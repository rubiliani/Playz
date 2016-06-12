'use strict';

angular.module('PlayzApp')
    .controller('notificationCtrl', function($scope, $http, $rootScope, $location,DB_queries,$timeout,growl) {
        console.log("notif controller")

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
            })
        }

        $scope.deleteNotification = function(index,eventId,notificationId){
        	console.log("delete id ",eventId,$rootScope.user._id,notificationId);
            DB_queries.deleteNotification(notificationId,$rootScope.user._id).then(function(){
                $rootScope.notifications.splice(index, 1);
                console.log("deleted");
            })
        }

        $rootScope.$on('newMessageReceivedFromWS', function(notification, msg) {
                //growl.warning("This adds a warn message", {title: 'Warning!'});
              //  growl.info("New Notification for "+notification.event.eventTitle||notification.event.sportType+" event", {title: 'New Notification'});
                //growl.success("This adds a success message"); //no title here
                //growl.error("This adds a error message", {title: 'ALERT WE GOT ERROR'});
        });
    });

