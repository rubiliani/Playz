'use strict';

angular.module('PlayzApp')
.controller('navbarCtrl', function($scope, $http, $rootScope, $location, fbLogin) {
	$scope.facebookLogout = function(){
		fbLogin.logout();
	}

	$scope.urlChanged=function(elem){
		if (elem){
			$("nav ul li").removeClass('active')
			$("."+elem).parent().addClass('active')
		}
		$(".navbar-collapse").collapse('hide');
	}

	//$scope.openNotification = function(){
		//$scope.$parent.show_notifications();
	//}
});
