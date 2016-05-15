'use strict';

angular.module('PlayzApp')
.controller('navbarCtrl', function($scope, $http, $rootScope, $location, fbLogin, notificationCtrl) {
	$scope.facebookLogout = function(){
		fbLogin.logout();
	}

	$scope.openNotification = function(){
		notificationCtrl.show_notification();
	}

	$scope.urlChanged=function(elem){
		$("nav ul li").removeClass('active')
		$("."+elem).parent().addClass('active')
		$(".navbar-collapse").collapse('hide');
	}
});
