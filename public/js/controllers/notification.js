'use strict';

angular.module('PlayzApp')
    .controller('notificationCtrl', function($scope, $http, $rootScope, $location,DB_queries,$timeout) {
        console.log("notif controller")

		$rootScope.getNotifications=function(){
			DB_queries.getNotifications().then(function(data){
				$rootScope.notifications=data;
			})
		}


        $scope.acceptNotification = function(eventId){
        	console.log("accepting id "+eventId)
        }

        $scope.deleteNotification = function(index,eventId){
        	console.log("delete id "+eventId)
        	$scope.notifications.splice(index, 1);
        }
        
        
    });

