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

	$scope.openEvent = function(card){
		console.log("open event ",card)
		$rootScope.card = card;
		
	}

	$scope.getPic = function(type){

		switch(type){
			case "Basketball":
				return "Basketball.png";
			case "Tennis":
				return "Tennis.png";
			case "Soccer":
				return "Soccer.png";
			case "Golf":
				return "Golf.png";
			case "TRX":
				return "TRX.png";
			case "Running":
				return "Running.png";
			case "Baseball":
				return "Baseball.png";
			case "Boxing":
				return "Boxing.png";
		}
	}



});
