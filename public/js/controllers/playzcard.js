'use strict';

angular.module('PlayzApp')
.controller('playzcardCtrl', function($scope, $http, $rootScope, $location,DB_queries) {
	console.log("playzcard controller");
	 $scope.usersDevices = [];

	//after joining event it will be removed from the home lists.
	$scope.joinEvent = function(card){
		console.log("joined ",card)
		DB_queries.joinEvent(card._id).then(function(){
			$rootScope.user.registeredEvents.push(card._id);
			 DB_queries.getCreatorDevices(card.creator).then(function(data){
                    console.log(data);

                    data.users.forEach(function (user, i){
                            user.devices.forEach(function(id,i){
                                $scope.usersDevices.push(id._id);
                            })
                        });

                    var msg = $rootScope.user.name+" joined to "+card.sportType+" event";
                    
                    DB_queries.sendNotifications($scope.usersDevices,msg).then(function(){
                             console.log("sendNotifications");
                    })
                       
                    

                })
		},
		function(err){

		});
	}

	$scope.openEvent = function(card){
		console.log("open event ",card)
		$rootScope.card = card;
		
	}

	



});
