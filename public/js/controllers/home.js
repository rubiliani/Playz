'use strict';

angular.module('PlayzApp')
.controller('homeCtrl', function($scope, $http, $rootScope,DB_queries, fbLogin) {
	console.log("home controller")
	//$scope.tabChanged=function(type){
		//if (type=="today"){
			// $scope.todayEvents=[{
			// 	sportType: "Football",
			// 	whenDate: "17/6/16",
			// 	level: "Proffesional",
			// 	mindset: "Just for fun",
			// 	groupSize: 10,
			// 	location: "Hod Hasharon",
			// 	registeredUsers:[
			// 		"1","2","3","4"
			// 	]
			// },
			// {
			// 	sportType: "Basketball",
			// 	whenDate: "17/6/16",
			// 	level: "Beginner",
			// 	mindset: "Turnament",
			// 	groupSize: 5,
			// 	location: "Ashdod",
			// 	registeredUsers:[
			// 		"1","2","3","4"
			// 	]
			// }]

		// 	DB_queries.getTodayEvents().then(function(data){
		// 		$scope.todayEvents=data.events;
		// 	})
		// }
		// else if (type=="tomorrow"){

		// 	DB_queries.getTomorrowEvents().then(function(data){
		// 		$scope.tomorrowEvents=data.events;
		// 	})
		// }
		// else if (type=="negotiable"){

		// 	DB_queries.getNegotiableEvents().then(function(data){
		// 		$scope.negotiableEvents=data.events;
		// 	})
		// }
	//}
	// $scope.tabChanged('today');
		$scope.init=function(){
			DB_queries.getAllEvents({from:0,to:5}).then(function(events){
				$scope.events=events;
			})
		}
		$scope.init();

});
