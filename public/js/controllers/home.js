'use strict';

angular.module('PlayzApp')
.controller('homeCtrl', function($scope, $http, $rootScope,DB_queries, fbLogin,growl,geolocation) {
	console.log("home controller")

		$scope.init=function(){
			DB_queries.getAllEvents().then(function(events){
				$scope.events=events;
				geolocation.getDistanceFromPosition();

			})

		}
		$scope.init();



});
