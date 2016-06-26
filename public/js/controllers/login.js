'use strict';

angular.module('PlayzApp')
.controller('loginCtrl', function($scope, $http, $rootScope, $location, fbLogin) {
	console.log('login controller')
	$scope.facebookLogin = function(){
		fbLogin.login().then(function(user){
			if (user.newUser){
				$location.url( "/register" );
			}
			else{
				$location.url( "/" );
			}
			
		});
	}
});
