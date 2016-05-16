'use strict';

angular.module('PlayzApp')
    .controller('createCtrl', function($scope, $http, $q ,$rootScope, $location,DB_queries,geolocation,$window,fbLogin,$timeout) {
        console.log("create controller")
        $scope.location={lat:0,lng:0,name:''};
        $scope.sports=[{name:"basketball"},{name:"tennis"}];
        $scope.levels=["Any Level", "Newbie", "Intermediate", "Proffesional"];
        $scope.mindsets=["Just for fun", "Turnament", "By the book"];
        $scope.whenDates=["Today", "Tomorrow", "Negotiable"]
        $scope.gender=["Co-ed", "Male", "Female"]
        $scope.paidFacilities=["OK", "No Way", "Don't Care"]
        $scope.event={
            sportType:$scope.sports[0].name,
            level:$scope.levels[0],
            mindset:$scope.mindsets[0],
            whenDate:$scope.whenDates[0],
            gender:$scope.gender[0],
            payedFacility:$scope.paidFacilities[0],
            location:{},
            radius:500,
            ageRange:{},
            registeredUsers:[]
        };
         
       $scope.groupSlider = {
            value: 2,
            options: {
                floor: 2,
                ceil: 50,
                step: 1
            }
        };

        $scope.ageSlider = {
            minValue: 20,
            maxValue: 40,
            options: {
                floor: 0,
                ceil: 100,
                step: 1
            }
        };

        $scope.radiusSlider = {
            value: 5,
            options: {
                floor: 0,
                ceil: 100,
                step: 5,
                showTicks: true,
                onChange:function(){
                     $scope.event.radius=$scope.radiusSlider.value*100;
                    google.maps.event.trigger($scope.refMap, 'click');
                }
            }
        };


        //http://willleahy.info/ng-maps/#/

        $scope.mymap = {
            center: [$scope.location.lat, $scope.location.lng],
            options: function() {
                return {
                    zoom:11,
                    streetViewControl: false,
                    scrollwheel: true,
                    draggable: false
                }
            },
            events: {
                click: function(e, map) {
                    if (e && e.latLng){
                        $scope.location.lat=e.latLng.lat()
                        $scope.location.lng=e.latLng.lng()
                    }

                    $scope.mymap.marker.position=[$scope.location.lat , $scope.location.lng]
                    $scope.mymap.circles.geometries=[{
                        center: [$scope.location.lat , $scope.location.lng],
                        radius: $scope.event.radius
                    }]
                    $scope.mymap.getLocationName();
                    if (e && e.latLng) {
                        $scope.$apply()
                    }
                },
                drag: function(e, p, map, points) {
                    // some action here
                }
            },
            marker:{
                position: [$scope.location.lat, $scope.location.lng],
                options: function(){
                    return {
                        draggable: false
                    }
                },
                events: {
                    click: function(e) {
                        console.log(e.latLng.lat() + " " + e.latLng.lng());
                    }
                },
            },
            circles :{
                geometries: [{
                    center: [$scope.location.lat, $scope.location.lng],
                    radius: $scope.event.radius
                }],
                options: function(geometry, properties, map, i) {
                    $scope.refMap=map;
                    return {
                        fillOpacity: 0.35,
                        fillColor: "#5bd75b",
                        strokeColor: "#5bd75b",
                        geodesic: true,
                        editable: false
                    }
                },
                events: {
                    radius_changed: function(){
                        console.log("circle radius radius_changed");
                         //$scope.$apply();
                    }
                }

            },
            getLocationName:function(){
                var geocoder = new google.maps.Geocoder();
                var geocoderRequest = { location: {lat: $scope.location.lat, lng: $scope.location.lng} };
                geocoder.geocode(geocoderRequest, function(results, status){
                    if (status=="OK"){
                        //console.log(results)
                        $scope.location.name=results[0].formatted_address;
                        $scope.$apply()
                    }
                    else{
                    }
                });
            }
        };

        $scope.refreshSlider = function () {
          $scope.$broadcast('rzSliderForceRender');

        };

        $scope.init=function(){
            $timeout(function () {
                $scope.refreshSlider();
                $scope.setCurrentLocation();
            },100);
        }
        $scope.init();



        $scope.privacyChanged=function(type){
            $scope.event.privacyType=type;
        }
        $scope.createEvent=function(){
            $scope.event.whenDate = translateTime($scope.event.whenDate);
            $scope.event.location=$scope.location;

            //sliders
            $scope.event.groupSize = $scope.groupSlider.value;
            $scope.event.ageRange.min = $scope.ageSlider.minValue;
            $scope.event.ageRange.max = $scope.ageSlider.maxValue;
            $scope.event.radius = $scope.radiusSlider.value;

            console.log($scope.event);

            DB_queries.createEvent($scope.event).then(function(event){
                console.log('events - create event',event)
                $location.url('/profile')
            })

        }

        $scope.cancel=function(){
            $window.history.back();
        }

        $scope.setHomeLoc=function(){
            if ($rootScope.user.hometown.data){
                $scope.location.lat = $rootScope.user.hometown.latitude;
                $scope.location.lng = $rootScope.user.hometown.longitude;
                $scope.updateMap();
            }
        }
    
        $scope.setCurrentLocation=function(){
           geolocation.getCurrentPosition().then(function(val){
                console.log('create page geo',val)
                $scope.location.lat = val.coords.latitude;
                $scope.location.lng = val.coords.longitude;
                $scope.updateMap();
           });
        }

        $scope.updateMap=function(){
            $scope.refMap.setCenter(new google.maps.LatLng($scope.location.lat, $scope.location.lng))
            $scope.mymap.getLocationName();
            google.maps.event.trigger($scope.refMap, 'click');
        }



        $scope.inviteFriend = function(fbId){
            console.log("invited user " +fbId)
            DB_queries.inviteFriend($scope.event,fbId).then(function(event){
                console.log('friend invited',event)
              
            })

        }


        fbLogin.getFriends().then(function(friends){
            console.log(friends)
            $scope.friends=friends;
        })

    });
