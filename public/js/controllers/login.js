'use strict';

angular.module('PlayzApp')
.controller('loginCtrl', function($scope, $http, $rootScope, $location, fbLogin) {
	$scope.facebookLogin = function(){
		fbLogin.login();
	}
});
