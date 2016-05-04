'use strict';

angular.module('PlayzApp')
.controller('homeCtrl', function($scope, $http, $rootScope,DB_queries) {
	DB_queries.getEvents().then(function(data){
		$scope.events = data;
	})
	console.log("home controller")
});
