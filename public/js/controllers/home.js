'use strict';

angular.module('PlayzApp')
.controller('homeCtrl', function($scope, $http, $rootScope, $location) {
	$rootScope.styles={
		container:"container",
		body:"with-top-navbar"
	}
	console.log("home")
});
