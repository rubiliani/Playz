'use strict';

angular.module('PlayzApp')
    .controller('notificationCtrl', function($scope, $http, $rootScope, $location,DB_queries,$timeout) {
        console.log("notif controller")

		$rootScope.getNotifications=function(){
			DB_queries.getNotifications().then(function(data){
				$rootScope.notifications=data;
			})
		}

        //TODO remove from invited users and remove the notification from the user list 
        //and update the registered users in both cases Remove OR Add
        $scope.acceptNotification = function(eventId,notificationId){
        	console.log("accepting id ",eventId,$rootScope.user._id,notificationId);
        }

        $scope.deleteNotification = function(index,eventId,notificationId){
        	console.log("delete id ",eventId,$rootScope.user._id,notificationId);
        	$scope.notifications.splice(index, 1);
        }
        
        
    });

