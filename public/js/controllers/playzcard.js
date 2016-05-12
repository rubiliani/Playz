'use strict';

angular.module('PlayzApp')
.controller('playzcardCtrl', function($scope, $http, $rootScope, $location) {
	console.log("playzcard controller");
	$scope.click=0;

	$scope.changeCardData=function(card){
		$scope.click++;
	}
});
