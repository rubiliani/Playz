'use strict';

angular.module('PlayzApp')
.controller('homeCtrl', function($scope, $http, $rootScope,DB_queries, fbLogin,growl,geolocation) {
	console.log("home controller")

	 	$scope.sports=[{name:"Any Sport"},{name:"Basketball"},{name:"Tennis"},{name:"Soccer"},{name:"Golf"},{name:"TRX"},{name:"Running"}];
        $scope.levels=["Any Level", "Newbie", "Intermediate", "Proffesional"];
        $scope.mindsets=["All Mindsets","Just for fun", "Turnament", "By the book"];
        $scope.location={latitude:0,longitude:0,name:''};

        $scope.filter = {
        	sportType:"Any Sport",
        	level:"Any Level",
        	mindset:"All Mindsets",
        	locationType:"Home Location"

        }
        $scope.events = [];


        $scope.locationChanged=function(type){
            $scope.filter.locationType=type;
        }
		$scope.init=function(){
			DB_queries.getAllEvents().then(function(events){
				
				geolocation.getDistanceFromPosition($scope.user.hometown,events).then(function(data){
					if(events.length>0){
						$scope.disatances = data.rows[0].elements;
						for(var i=0;i<events.length;i++){
							events[i].distance = $scope.disatances[i];

							 var userHome = new google.maps.LatLng($scope.user.hometown.latitude, $scope.user.hometown.longitude);
							 var eventLoc = new google.maps.LatLng(events[i].location.latitude, events[i].location.longitude);

							 events[i].airDistance = Math.round((getDistance(userHome,eventLoc)/1000),2);
							 if(events[i].radius>=events[i].airDistance)
							 	events[i].show = "true";
							 else
							 	 events[i].show = "false";
						}
					}
					$scope.events=events;

				});

			})


		}
		$scope.init();

		$scope.openEvent = function(card){
			console.log("open event ",card)
			$rootScope.card = card;
		
		}

		var rad = function(x) {
       		return x * Math.PI / 180;
    	};

    	var getDistance = function(p1, p2) {
      		var R = 6378137; // Earth’s mean radius in meter
      		var dLat = rad(p2.lat() - p1.lat());
      		var dLong = rad(p2.lng() - p1.lng());
      		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        		Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
        		Math.sin(dLong / 2) * Math.sin(dLong / 2);
      		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      		var d = R * c;
      		return d; // returns the distance in meter
    	};

    	

    	$scope.filterEvents = function(){
    		if($scope.filter.locationType=="current"){
    			 geolocation.getCurrentPosition().then(function(val){
                	console.log('create page geo',val);
                	$scope.location.latitude = val.coords.latitude;
                	$scope.location.longitude = val.coords.longitude;

                	geolocation.getDistanceFromPosition($scope.location,$scope.events).then(function(data){
					if($scope.events.length>0){
						$scope.disatances = data.rows[0].elements;
						for(var i=0;i<$scope.events.length;i++){
							$scope.events[i].distance = $scope.disatances[i];

							 var userHome = new google.maps.LatLng($scope.location.latitude, $scope.location.longitude);
							 var eventLoc = new google.maps.LatLng($scope.events[i].location.latitude, $scope.events[i].location.longitude);

							 $scope.events[i].airDistance = Math.round((getDistance(userHome,eventLoc)/1000),2);
							 if($scope.events[i].radius>=$scope.events[i].airDistance){
								 $scope.events[i].show = true;
							 }
							 else
							 	 $scope.events[i].show = false;
						}
					}
					

				});
 				

            	});
    		}


    		

    		
    	}


});
