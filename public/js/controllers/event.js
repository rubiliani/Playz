'use strict';

angular.module('PlayzApp')
.controller('eventCtrl', function($scope, $http, $rootScope, $location,DB_queries,resolveGetEventById,$window,growl) {
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
			//	$scope.messages.push({
			//		event:$scope.event._id,
			//		sender:$rootScope.user,
			//		text:$scope.textMsg,
			//		timestamp:new Date()
			//	});
			$scope.textMsg='';
    	});
	}

	$rootScope.$on('newMessageReceivedFromWS', function(event, msg) {
		if ($scope.event._id==msg.event){
			$scope.messages.push(msg);
			$scope.$apply()
		}
		else{
			//growl.warning("This adds a warn message", {title: 'Warning!'});
			growl.info("New message for "+event.eventTitle+" event", {title: 'New Message'});
			//growl.success("This adds a success message"); //no title here
			//growl.error("This adds a error message", {title: 'ALERT WE GOT ERROR'});
		}
	});
	
     $scope.getMessage();

	$scope.leaveEvent=function(card){
		console.log("leave ",card)
		DB_queries.leaveEvent(card._id).then(function(){
				var index = $rootScope.user.registeredEvents.indexOf(card._id);
				if (index != -1){
					$rootScope.user.registeredEvents.splice(index,1);
				}
				$window.history.back();
			},
			function(err){

			});
	}
	$scope.goBack=function(card){
		$window.history.back();

	}
});
