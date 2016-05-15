'use strict';

angular.module('PlayzApp')
    .controller('createCtrl', function($scope, $http, $rootScope, $location,DB_queries,$window) {
        console.log("create controller")
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
            ageRange:{}
        };
        //http://willleahy.info/ng-maps/#/
        $scope.map = {
            center: [39, -121],
            options: function() {
                return {
                    //zoom:15,
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
                }
            },
            marker:{
                position: [39, -121],
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
                        center: [39, -121],
                        radius: 100000
                    }
                ],
                options: function(geometry, properties, map, i) {
                    //var opacity = 1/(i+1)
                    return {
                        fillOpacity: 0.35,
                        fillColor: "#5bd75b",
                        strokeColor: "#5bd75b"
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
            });
        }
        $scope.init();

        $scope.privacyChanged=function(type){
            $scope.event.privacyType=type;
        }
        $scope.createEvent=function(){
            console.log($scope.event);

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

        }
        $scope.setCurrentLocation=function(){

        }
    });
