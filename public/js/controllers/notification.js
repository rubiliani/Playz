'use strict';

angular.module('PlayzApp')
    .controller('notificationCtrl', function($scope, $http, $rootScope, $location,DB_queries,$timeout) {
        console.log("notif controller")

		$rootScope.openNotification=function(){
			DB_queries.getNotifications().then(function(data){
				$rootScope.notifications=data;
			})
		}
        //$scope.notifications = [{
        //	event :{
        //		id:1,
        //		sportType: "Basketball",
        //		whenDate: "16/5/16",
			//	location: {name:"Hod Hasharon"}
        //	},
        //	creator:{
        //		name: "Rubi Liani",
        //		picture:{
        //			url: "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12038213_10153678927354559_4242577616711709513_n.jpg?oh=071acddc4f065b2e0c945522f7580514&oe=57A078F2"
        //		}
        //	}
        //
        //},
        //{
        //	event :{
        //		id:2,
        //		sportType: "Football",
        //		whenDate: "18/5/16",
			//	location: {name:"Hod Hasharon"}
        //	},
        //	creator:{
        //		name: "Rubi Liani",
        //		picture:{
        //			url: "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12038213_10153678927354559_4242577616711709513_n.jpg?oh=071acddc4f065b2e0c945522f7580514&oe=57A078F2"
        //		}
        //	}
        //}
        //];

        $scope.acceptNotification = function(eventId){
        	console.log("accepting id "+eventId)
        }

        $scope.deleteNotification = function(index,eventId){
        	console.log("delete id "+eventId)
        	$scope.notifications.splice(index, 1);
        }
        
        
    });

