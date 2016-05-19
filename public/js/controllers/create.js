'use strict';

angular.module('PlayzApp')
    .controller('createCtrl', function($scope, $http, $q ,$rootScope, $location,DB_queries,geolocation,$window,fbLogin,$timeout) {
        console.log("create controller")

        $scope.location={lat:0,lng:0,name:''};
        $scope.sports=[{name:"basketball"},{name:"tennis"}];
        $scope.levels=["Any Level", "Newbie", "Intermediate", "Proffesional"];
        $scope.mindsets=["Just for fun", "Turnament", "By the book"];
        $scope.gender=["Co-ed", "Male", "Female"]
        $scope.paidFacilities=["OK", "No Way", "Don't Care"]

        $scope.event={
            sportType:$scope.sports[0].name,
            level:$scope.levels[0],
            mindset:$scope.mindsets[0],
            whenDate:new Date(),
            gender:$scope.gender[0],
            payedFacility:$scope.paidFacilities[0],
            location:{},
            radius:100,
            ageRange:{},
            creator:$rootScope.user._id,
            invitedUsers:[],
            registeredUsers:[$rootScope.user._id]
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
            value: 10,
            options: {
                floor: 0,
                ceil: 100,
                step: 5,
                showTicks: true,
                onChange:function(){
                     $scope.event.radius=$scope.radiusSlider.value*10;
                    google.maps.event.trigger($scope.refMap, 'click');
                }
            }
        };


        //http://willleahy.info/ng-maps/#/

        $scope.mymap = {
            center: [$scope.location.lat, $scope.location.lng],
            options: function() {
                return {
                    zoom:15,
                    streetViewControl: false,
                    scrollwheel: true,
                    draggable: true
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

        $scope.validateDate=function(){
            if (!$scope.event.whenDate){
                $scope.event.whenDate=new Date();
            }
        }

        $scope.privacyChanged=function(type){
            $scope.event.privacyType=type;
        }
        $scope.createEvent=function(){
            $scope.event.whenDate.setHours(0,0,0,0);
            $scope.event.location={
                "name":$scope.location.name,
                "latitude":$scope.location.lat,
                "longitude":$scope.location.lng
            };
            $scope.whenDate =  new Date($scope.whenDate).setHours(0,0,0,0)
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
            $scope.event.invitedUsers.push(fbId);
            //$(".btn-danger-outline").removeClass('hide');
            //$(".btn-primary-outline").addClass('hide');

            /*
            DB_queries.inviteFriend($scope.event,fbId).then(function(event){
                console.log('friend invited',event)
              
            })*/

        }
        $scope.cancelInviteFriend = function($index,fbId){
            console.log("cancel invited user " +fbId)
            //$(".btn-danger-outline").addClass('hide');
            //$(".btn-primary-outline").removeClass('hide');
            $scope.event.invitedUsers.splice($index, 1);


        }



        fbLogin.getFriends().then(function(friends){
            console.log(friends)
            $scope.friends=friends;
        })

    });
