'use strict';

angular.module('PlayzApp')
    .controller('createCtrl', function($scope, $http, $rootScope, $location,DB_queries,geolocation,$window,fbLogin) {
        console.log("create controller")
        $scope.location={lat:0,lng:0};
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
            ageRange:{}
        };
         
       $scope.minSlider = {
            value: 10
        };


        //http://willleahy.info/ng-maps/#/

        $scope.map = {
            center: [$scope.location.lat, $scope.location.lng],
            options: function() {
                return {
                    zoom:11,
                    streetViewControl: false,
                    scrollwheel: true,
                    draggable: true
                }
            },
            events: {
                click: function(e, map) {
                    console.log(e.latLng.lat() + " " + e.latLng.lng());
                },
                drag: function(e, p, map, points) {
                    // some action here
                },
                center_changed: function(){
                    console.log("changed location!!");
                    $scope.map.center[0] = $scope.location.lat;
                    $scope.map.center[1] = $scope.location.lng;
                    $scope.map.marker.position[0] = $scope.location.lat;
                    $scope.map.marker.position[1] = $scope.location.lng;
                    $scope.$apply();

                }
            },
            marker:{
                position: [$scope.location.lat, $scope.location.lng],
                //decimals: 4,
                options: function(){
                    return {
                        draggable: true
                    }
                },
                events: {
                    click: function(e) {
                        console.log(e.latLng.lat() + " " + e.latLng.lng());
                        var geocoder = new google.maps.Geocoder();
                        var geocoderRequest = { location: {lat: e.latLng.lat(), lng: e.latLng.lng()} };
                        geocoder.geocode(geocoderRequest, function(results, status){
                            if (status=="OK"){
                                console.log(results)
                            }
                        });
                    }
                }
            },
            circles :{
                geometries: [
                    {
                        center: [$scope.location.lat, $scope.location.lng],
                        radius: 5000
                    }
                ],
                options: function(geometry, properties, map, i) {
                    //var opacity = 1/(i+1)
                    return {
                        fillOpacity: 0.35,
                        fillColor: "#5bd75b",
                        strokeColor: "#5bd75b",
                        geodesic: true,
                        editable: true
                    }
                },
                events:
                {
                    radius_changed: function(){
                        console.log("circle radius radius_changed");
                         $scope.$apply();
                    }
                }

            }
        };

        $scope.init=function(){
            $("#radiusSlider").slider({min  : 1, max  : 50, value: 5});
            $("#groupSlider").slider({min  : 1, max  : 50, value: 2});
            $("#ageSlider").slider({min  : 10, max  : 100, value: [20, 40]});

            $("#ageSlider").on("slide", function(slideEvt) {
                $("#rangeA").text(slideEvt.value[0]);
                $("#rangeB").text(slideEvt.value[1]);
                $scope.event.ageRange.min = slideEvt.value[0];
                $scope.event.ageRange.max = slideEvt.value[1];
            });

            $("#groupSlider").on("slide", function(slideEvt) {
                $("#rangeSizeA").text(slideEvt.value);
                $scope.event.groupSize = slideEvt.value;

            });
            $("#radiusSlider").on("slide", function(slideEvt) {
                $scope.event.radius = slideEvt.value;
                $scope.radiusChange($scope.event.radius);
            });
        }
        $scope.init();



        $scope.privacyChanged=function(type){
            $scope.event.privacyType=type;
        }
        $scope.createEvent=function(){
            console.log($scope.event);
            $scope.event.whenDate = translateTime($scope.event.whenDate);
            $scope.event.location.latitude = $scope.map.center[0];
            $scope.event.location.longitude = $scope.map.center[1];

            $scope.event.registeredUsers=[];
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
                //$scope.map.setCenter(new google.maps.LatLng($scope.location.lat, $scope.location.lng), 5);
            }
            else{
                $scope.setCurrentLocation();
            }
        }
    
        $scope.setCurrentLocation=function(){
           geolocation.getCurrentPosition().then(function(val){
                console.log('create page geo',val)
                $scope.location.lat = val.coords.latitude;
                $scope.location.lng = val.coords.longitude;
                $scope.map.center[0] = $scope.location.lat;
                $scope.map.center[1] = $scope.location.lng;
           });
        }
         $scope.setCurrentLocation();

        $scope.radiusChange = function(value) {
            console.log("slider value changed : " + value);
           
            if ($scope.map !== undefined) {
                $scope.map.circles.geometries[0].radius = (value * 1000);
            }
        };

        fbLogin.getFriends().then(function(friends){
            console.log(friends)
            $scope.friends=friends;
        })

    });
