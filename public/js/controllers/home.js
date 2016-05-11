'use strict';

angular.module('PlayzApp')
.controller('homeCtrl', function($scope, $http, $rootScope,DB_queries) {
	console.log("home controller")
	$scope.tabChanged=function(type){
		if (type=="today"){
			//DB_queries.getUpcomingEvents().then(function(data){
			//	$scope.upcomingEvents=data.events;
			//})
		}
		else if (type=="tomorrow"){
			//DB_queries.getPastEvents().then(function(data){
			//	$scope.pastEvents=data.events;
			//})
		}
		else if (type=="negotiable"){
			//DB_queries.getPastEvents().then(function(data){
			//	$scope.pastEvents=data.events;
			//})
		}
	}
	$scope.tabChanged('today');
});
