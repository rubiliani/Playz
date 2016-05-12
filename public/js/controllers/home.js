'use strict';

angular.module('PlayzApp')
.controller('homeCtrl', function($scope, $http, $rootScope,DB_queries, fbLogin) {
	console.log("home controller")
	$scope.tabChanged=function(type){
		if (type=="today"){
			$scope.todayEvents=["today avishay"," today hajbi"]

			//DB_queries.getTodayEvents().then(function(data){
			//	$scope.todayEvents=data.events;
			//})
		}
		else if (type=="tomorrow"){
			$scope.tomorrowEvents=["tomorrow avishay"," tomorrow hajbi"]

			//DB_queries.getTomorrowEvents().then(function(data){
			//	$scope.tomorrowEvents=data.events;
			//})
		}
		else if (type=="negotiable"){
			$scope.negotiableEvents=["negotiable avishay"," negotiable hajbi"]

			//DB_queries.getNegotiableEvents().then(function(data){
			//	$scope.negotiableEvents=data.events;
			//})
		}
	}
	$scope.tabChanged('today');

});
