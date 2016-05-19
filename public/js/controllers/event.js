'use strict';

angular.module('PlayzApp')
.controller('eventCtrl', function($scope, $http, $rootScope, $location,DB_queries,resolveGetEventById) {
    $scope.event = resolveGetEventById;
    $scope.messages = [];
    console.log("event controller",$scope);

    $scope.getMessage = function(){
    	DB_queries.getMessages($scope.event._id).then(function(messages){
				$scope.messages=messages;
    	});
	}

	$scope.createMessage = function(){
		DB_queries.createMessage($rootScope.user._id,$scope.event._id,$scope.textMsg).then(function(messages){
				$scope.messages.push({
					sender:$rootScope.user,
					text:$scope.textMsg,
					timestamp:new Date()
				});
			$scope.textMsg='';
    	});
	}

     $scope.getMessage();
});
