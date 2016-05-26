'use strict';

angular.module('PlayzApp')
.controller('homeCtrl', function($scope, $http, $rootScope,DB_queries, fbLogin,growl) {
	console.log("home controller")

		$scope.init=function(){
			DB_queries.getAllEvents({from:0,to:5}).then(function(events){
				$scope.events=events;

			})

		}
		$scope.init();



});
