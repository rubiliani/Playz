'use strict';

angular.module('PlayzApp')
.controller('playzcardCtrl', function($scope, $http, $rootScope, $location,DB_queries) {
	console.log("playzcard controller");

	//after joining event it will be removed from the home lists.
	$scope.joinEvent = function(card){
		console.log("joined ",card)
		DB_queries.joinEvent(card._id).then(function(){
			$rootScope.user.registeredEvents.push(card._id)
		},
		function(err){

		});
	}
});
