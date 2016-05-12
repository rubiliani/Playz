'use strict';

angular.module('PlayzApp')
.controller('homeCtrl', function($scope, $http, $rootScope,DB_queries) {
	console.log("home controller")
	$scope.tabChanged=function(type){
		if (type=="today"){
			$scope.todayEvents=["today avishay"," today hajbi"]

			//DB_queries.getUpcomingEvents().then(function(data){
			//	$scope.todayEvents=data.events;
			//})
		}
		else if (type=="tomorrow"){
			$scope.tomorrowEvents=["tomorrow avishay"," tomorrow hajbi"]

			//DB_queries.getPastEvents().then(function(data){
			//	$scope.tomorrowEvents=data.events;
			//})
		}
		else if (type=="negotiable"){
			$scope.negotiableEvents=["negotiable avishay"," negotiable hajbi"]

			//DB_queries.getPastEvents().then(function(data){
			//	$scope.negotiableEvents=data.events;
			//})
		}
	}
	$scope.tabChanged('today');
});
