'use strict';

angular.module('PlayzApp')
  .controller('homeCtrl', function ($scope, $http, $rootScope,$interval,$location,$route, DB_queries, fbLogin, growl, geolocation) {
    console.log("home controller")
    $scope.shownEvents = 0;

    $scope.sports = [{name: "Any Sport"}, {name: "Baseball"}, {name: "Basketball"}, {name: "Boxing"}, {name: "Diving"}, {name: "Fishing"},
      {name: "Golf"}, {name: "Hocky"}, {name: "Running"}, {name: "Ski"}, {name: "Soccer"}, {name: "Surfing"}, {name: "Swimming"}
      , {name: "Table Tennis"}, {name: "Tennis"}];
    $scope.levels = ["Any Level", "Newbie", "Intermediate", "Proffesional"];
    $scope.mindsets = ["All Mindsets", "Just for fun", "Turnament", "By the book"];
    $scope.location = {latitude: 0, longitude: 0, name: ''};

    $scope.filter = {
      sportType: "Any Sport",
      level: "Any Level",
      mindset: "All Mindsets",
      locationType: "home"

    }
    $scope.events = [];
    $scope.splash = true;


    $scope.locationChanged = function (type) {
      $scope.filter.locationType = type;
    }
    $scope.init = function () {

        $scope.notification();
    	$scope.splash = true;

      	DB_queries.getAllEvents().then(function (events) {
        	$scope.events = events;
        	$scope.filterEvents();
      	});
    }

    $scope.notification = function(){

      
      if(pushcrew.isAPIReady) {
         //_pcq.push(['triggerOptOut']);
         
        console.log(pushcrew.subscriberId);
        if(pushcrew.subscriberId==false){
          window._pcq = window._pcq || [];
            _pcq.push(['subscriptionSuccessCallback',callbackFunctionOnSuccessfulSubscription]); //registers callback function to be called when user gets successfully subscribed

            function callbackFunctionOnSuccessfulSubscription(subscriberId, values) {
                console.log('User got successfully subscribed.');

                console.log(subscriberId); //will output the user's subscriberId

                console.log(values.status); // SUBSCRIBED or ALREADYSUBSCRIBED

                console.log(values.message) // 'User has subscribed to push notifications.' or 'User is already subscribed to push notifications.'
                DB_queries.addUserDevice($rootScope.user._id,ubscriberId).then(function () {
                  console.log("successfully registerd device")
                });
                }
                _pcq.push(['subscriptionFailureCallback',callbackFunctionOnFailedSubscription]); //registers callback function to be called when user gets successfully subscribed

                    function callbackFunctionOnFailedSubscription(values) {
                        console.log('User could not get subscribed to push notifications');

                        console.log(values.status); // BLOCKED , UNSUBSCRIBED or CANCELLED

                        console.log(values.message) // 'User has blocked push notifications.', 'User has unsubscribed from push notifications', 'No change in subscription. Child window was closed.' or 'User has closed the notifications opt-in.'

                       window._pcq.push(['triggerOptIn']); 
                    }
                
            
        
        }
        else{
          if(!$rootScope.user)
            return;
           DB_queries.addUserDevice($rootScope.user._id,pushcrew.subscriberId).then(function () {
                  console.log("successfully registerd device")
                });
                
        }
      }
    }

    $interval(function(){
		$scope.init();
		console.log("refresh")
	},300000);

    $scope.init();

    $scope.openEvent = function (card) {
      console.log("open event ", card)
      $rootScope.card = card;

    }

    var rad = function (x) {
      return x * Math.PI / 180;
    };

    //get air distance
    var getDistance = function (p1, p2) {
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

    $scope.createNewEvent = function () {
            $location.url('/create')
    }


     $scope.clearFilter = function(){
          $scope.filter.sportType = "Any Sport";
          $scope.filter.level = $scope.levels[0];
          $scope.filter.mindset = "All Mindsets";
          $scope.filter.locationType = "home";

          $scope.filterEvents();
        
     }
   


    $scope.filterEvents = function () {
      $scope.splash = true;
       $scope.shownEvents = 0;
      console.log('my filter', $scope.filter);
      if ($scope.filter.locationType !== "Any place") {
        geolocation.getCurrentPosition().then(function (val) {
          console.log('create page geo', val);
          $scope.location.latitude = val.coords.latitude;
          $scope.location.longitude = val.coords.longitude;

          if ($scope.filter.locationType == "current") {
            geolocation.getDistanceFromPosition($scope.location, $scope.events).then(function (data) {
              $scope.events.forEach(function (event, i) {
                $scope.disatances = data.rows[0].elements;
                event.distance = $scope.disatances[i];

                var userHome = new google.maps.LatLng($scope.location.latitude, $scope.location.longitude);
                var eventLoc = new google.maps.LatLng(event.location.latitude, event.location.longitude);

                event.airDistance = Math.round((getDistance(userHome, eventLoc) / 1000), 2);
                if (event.radius >= event.airDistance) {
                  event.location_show = true;
                }
                else {
                  event.location_show = false;
                }

                if(event.location_show && event.level_show && event.sportType_show && event.mindset_show && event.groupSize>event.registeredUsers.length){
                  event.showed = true;
                  $scope.shownEvents++;
                }
                else{
                  event.showed = false;
                }

              })
               $scope.splash = false;
            });
          }
          else {
            geolocation.getDistanceFromPosition($rootScope.user.hometown, $scope.events).then(function (data) {
            	
              $scope.events.forEach(function (event, i) {
                $scope.disatances = data.rows[0].elements;
                event.distance = $scope.disatances[i];
                var userHome = new google.maps.LatLng($scope.user.hometown.latitude, $scope.user.hometown.longitude);
                var eventLoc = new google.maps.LatLng(event.location.latitude, event.location.longitude);
                event.airDistance = Math.round((getDistance(userHome, eventLoc) / 1000), 2);
                if (event.radius >= event.airDistance) {
                  event.location_show = true;
                }
                else {
                  event.location_show = false;
                }

                if(event.location_show && event.level_show && event.sportType_show && event.mindset_show && event.groupSize>event.registeredUsers.length){
                  event.showed = true;
                  $scope.shownEvents++;
                }
                else{
                  event.showed = false;
                }
              });
              $scope.splash = false;
            })
          }
        });
      }
      else {
        event.location_show = true;
      }

      $scope.events.forEach(function (event, i) {
        if ($scope.filter.level !== "Any Level") {
          if (event.level == $scope.filter.level){
            event.level_show = true;
          }else{
            event.level_show = false;
          }
        } else {
          event.level_show = true;
        }
        if ($scope.filter.sportType !== "Any Sport") {
          if (event.sportType == $scope.filter.sportType){
            event.sportType_show = true;
          }else{
            event.sportType_show = false;
          }
        } else {
          event.sportType_show = true;
        }
        if ($scope.filter.mindset !== "All Mindsets") {
          if (event.mindset == $scope.filter.mindset){
            event.mindset_show = true;
          }else{
            event.mindset_show = false;
          }
        } else {
          event.mindset_show = true;
        }

      })


    }


  });
