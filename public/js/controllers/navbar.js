'use strict';

angular.module('PlayzApp')
.controller('navbarCtrl', function($scope, $http, $rootScope, $location, fbLogin) {
	$scope.facebookLogout = function(){
		fbLogin.logout();
	}
});
