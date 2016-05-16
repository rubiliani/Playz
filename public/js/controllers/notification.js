'use strict';

angular.module('PlayzApp')
    .controller('notificationCtrl', function($scope, $http, $rootScope, $location,DB_queries) {
        console.log("notif controller")

        $scope.notifications = [{
        	event :{ 
        		sportType: "Basketball",
        		whenDate: "16/5/16",
        		address: "Hod Hasharon"
        	},
        	creator:{
        		name: "Rubi Liani",
        		picture:{
        			url: "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12038213_10153678927354559_4242577616711709513_n.jpg?oh=071acddc4f065b2e0c945522f7580514&oe=57A078F2"
        		}
        	}
        	
        },
        {
        	event :{ 
        		sportType: "Football",
        		whenDate: "18/5/16",
        		address: "Herzeliyya"
        	},
        	creator:{
        		name: "Rubi Liani",
        		picture:{
        			url: "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12038213_10153678927354559_4242577616711709513_n.jpg?oh=071acddc4f065b2e0c945522f7580514&oe=57A078F2"
        		}
        	}
        	
        }

        ];
        
    });

