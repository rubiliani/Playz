'use strict';

angular.module('PlayzApp')
.controller('homeCtrl', function($scope, $rootScope,DB_queries) {
	$scope.loading=true;
	//DB_queries.getEvents().then(function(res){
	//	$scope.loading=false;
	//	console.log('getEvents then',res)
	//});

	console.log("home controller")
});
