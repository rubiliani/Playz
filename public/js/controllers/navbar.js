'use strict';

angular.module('PlayzApp')
.controller('navbarCtrl', function($scope, $http, $rootScope, $location, fbLogin) {
	$scope.facebookLogout = function(){
		fbLogin.logout();
	}

	$scope.urlChanged=function(){

		$(".navbar-collapse").collapse('hide');
	}
});
