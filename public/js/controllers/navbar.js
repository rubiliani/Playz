'use strict';

angular.module('PlayzApp')
.controller('navbarCtrl', function($scope, $http, $rootScope, $location, fbLogin) {
	$scope.facebookLogout = function(){
		fbLogin.logout();
	}

	
	 $scope.playzerCard = function () {
            $location.url('/profile')
    }

	$scope.urlChanged=function(elem){
		if (elem){
			$("nav ul li").removeClass('active')
			$("."+elem).parent().addClass('active')
		}
		$(".navbar-collapse").collapse('hide');
	}

});
