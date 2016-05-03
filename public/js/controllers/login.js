'use strict';

angular.module('PlayzApp')
.controller('loginCtrl', function($scope, $http, $rootScope, $location, fbLogin) {
	$rootScope.styles={
		container:"container-content-middle",
		body:" container-content-middle loginBody"
	}
	$scope.facebookLogin = function(){
		fbLogin.login();
	}
});
