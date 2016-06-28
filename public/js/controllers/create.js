'use strict';

angular.module('PlayzApp')
    .controller('createCtrl', function($scope, $http, $q ,$rootScope, $location,DB_queries,geolocation,$window,fbLogin,$timeout) {
        console.log("create controller")

        $scope.usersDevices = [];

        $scope.location={lat:0,lng:0,name:''};
        $scope.sports=[{name:"Baseball"},{name:"Basketball"},{name:"Boxing"},{name:"Diving"},{name:"Fishing"},
            {name:"Golf"},{name:"Hocky"},{name:"Running"},{name:"Ski"},{name:"Soccer"},{name:"Surfing"},{name:"Swimming"}
            ,{name:"Table Tennis"},{name:"Tennis"}];
        $scope.levels=["Any Level", "Newbie", "Intermediate", "Proffesional"];
        $scope.mindsets=["Just for fun", "Turnament", "By the book"];
        $scope.genders=["Co-ed","Male", "Female"];
        $scope.whens=["Don't Care","Morning", "Noon","After Noon", "Evening"];
        $scope.paidFacilities=["OK", "No Way", "Don't Care"];

        $scope.event={
            sportType:$scope.sports[0].name,
            level:$scope.levels[0],
            mindset:$scope.mindsets[0],
            whenDate:new Date(),
            gender:$scope.genders[0],
            payedFacility:$scope.paidFacilities[0],
            location:{},
            radius:10000,
            ageRange:{},
            creator:'',
            invitedUsers:[],
            eventTitle:'',
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
            value: 10,
            options: {
                floor: 0,
                ceil: 100,
                step: 5,
                showTicks: true,
                onChange:function(){
                     $scope.event.radius=$scope.radiusSlider.value*1000;
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
                        var arrAddress = results[0].address_components;
                        //var itemRoute='';
                        var itemLocality='';
                        //var itemCountry='';
                        //var itemPc='';
                        //var itemSnumber='';

                        // iterate through address_component array
                        $.each(arrAddress, function (i, address_component) {
                           
                            if (address_component.types[0] == "locality"){
                                console.log("town:"+address_component.long_name);
                                itemLocality = address_component.long_name;
                            }

                            
                            //return false; // break the loop   
                        });


                        $scope.location.city=itemLocality;
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
            // $scope.event.whenDate.setHours(0,0,0,0);
            $scope.event.location={
                "city":$scope.location.city,
                "name":$scope.location.name,
                "latitude":$scope.location.lat,
                "longitude":$scope.location.lng
            };
            $scope.event.creator=$rootScope.user._id;
            $scope.event.registeredUsers.push($rootScope.user._id);
            $scope.event.whenDate =  new Date($scope.event.whenDate.setHours(0,0,0,0))
            //sliders
            $scope.event.groupSize = $scope.groupSlider.value;
            $scope.event.ageRange.min = $scope.ageSlider.minValue;
            $scope.event.ageRange.max = $scope.ageSlider.maxValue;
            $scope.event.radius = $scope.radiusSlider.value;

            console.log($scope.event);
            
            DB_queries.createEvent($scope.event).then(function(event){
                console.log('events - create event',event)

                DB_queries.getUsersDevices($scope.event.invitedUsers).then(function(data){
                    console.log(data);

                    data.users.forEach(function (user, i){
                            user.devices.forEach(function(id,i){
                                $scope.usersDevices.push(id._id);
                            })
                        });

                    var msg = "New Invitation to "+$scope.event.sportType+" event";
                    
                    DB_queries.sendNotifications($scope.usersDevices,msg).then(function(){
                             console.log("sendNotifications");
                    })
                       
                    

                })
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



        $scope.inviteFriend = function(fbId,friend){
            console.log("invited user " +fbId)
            $scope.event.invitedUsers.push(fbId);
            friend.added=true;
            //$(".btn-danger-outline").removeClass('hide');
            //$(".btn-primary-outline").addClass('hide');

            /*
            DB_queries.inviteFriend($scope.event,fbId).then(function(event){
                console.log('friend invited',event)
              
            })*/

        }
        $scope.cancelInviteFriend = function($index,friend){
            console.log("cancel invited user " +friend.id)
            
            $scope.event.invitedUsers.splice($index, 1);
            friend.added=false;


        }



        fbLogin.getFriends().then(function(friends){
            console.log(friends)
            $scope.friends=friends;
        })

        $scope.getFriends_Next_Prev=function(url){
            fbLogin.getFriends_Next_Prev(url).then(function(friends){
                console.log(friends)
                $scope.friends=friends;
            })
        }

    });
