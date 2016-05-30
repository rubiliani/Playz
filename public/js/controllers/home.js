'use strict';

angular.module('PlayzApp')
.controller('homeCtrl', function($scope, $http, $rootScope,DB_queries, fbLogin,growl,geolocation) {
	console.log("home controller")

		$scope.init=function(){
			DB_queries.getAllEvents().then(function(events){
				
				geolocation.getDistanceFromPosition($scope.user.hometown,events).then(function(data){
					$scope.disatances = data.rows[0].elements;
					if($scope.disatances.length>0){
						for(var i=0;i<events.length;i++){
							events[i].distance = $scope.disatances[i];
						}
					}
					$scope.events=events;

				});

			})

		}
		$scope.init();



});
