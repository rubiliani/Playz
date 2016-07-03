'use strict';

angular.module('PlayzApp') 
.controller('editCtrl', function($scope, $http,$q, $rootScope, $location,DB_queries,geolocation,$timeout,resolveGetEventById,$window,growl,fbLogin) {
    $scope.event = resolveGetEventById;
    $scope.event.whenDate = new Date($scope.event.whenDate);
    $scope.removedUsers = [];
    $scope.usersDevices = [];

   console.log("Got event ",$scope.event);
   	

     $scope.location={lat:0,lng:0,name:''};
         $scope.sports=[{name:"Baseball"},{name:"Basketball"},{name:"Boxing"},{name:"Chess"},{name:"Cycling"},{name:"Fishing"},{name:"Football"},
            {name:"Golf"},{name:"Hockey"},{name:"Ping-Pong"},{name:"Pool"},{name:"Running"},{name:"Soccer"},{name:"Surfing"},{name:"Swimming"}
            ,{name:"Tennis"},{name:"Volleyball"}];
        $scope.levels=["Any Level", "Newbie", "Intermediate", "Proffesional"];
        $scope.mindsets=["Just for fun", "Turnament", "By the book"];
        $scope.genders=["Co-ed","Male", "Female"];
        $scope.paidFacilities=["OK", "No Way", "Don't Care"];
        $scope.whens=["Don't Care","Morning", "Noon","After Noon", "Evening"];
/*
        $scope.event={
            sportType:$scope.tempevent.sportType,
            level:$scope.tempevent.level,
            mindset:$scope.tempevent.mindset,
            whenDate:new Date($scope.tempevent.whenDate),
            gender:$scope.tempevent.gender,
            payedFacility:$scope.tempevent.payedFacility,
            location:{},
            radius:$scope.tempevent.radius,
            ageRange:{min:$scope.tempevent.ageRange.min,max:$scope.tempevent.ageRange.max},
            creator:$scope.tempevent.creator,
            invitedUsers:$scope.tempevent.invitedUsers,
            registeredUsers:$scope.tempevent.registeredUsers
        };*/
         
       $scope.groupSlider = {
            value:$scope.event.groupSize,
            options: {
                floor: 2,
                ceil: 50,
                step: 1
            }
        };

        $scope.ageSlider = {
            minValue: $scope.event.ageRange.min,
            maxValue: $scope.event.ageRange.max,
            options: {
                floor: 0,
                ceil: 100,
                step: 1
            }
        };

        $scope.radiusSlider = {
            value: $scope.event.radius,
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
                $scope.$apply()
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
        $scope.updateEvent=function(){
            $scope.event.whenDate.setHours(0,0,0,0);
            $scope.event.location={
                "city":$scope.location.city,
                "name":$scope.location.name,
                "latitude":$scope.location.lat,
                "longitude":$scope.location.lng
            };
            //$scope.event.creator=$rootScope.user._id;
            //$scope.event.registeredUsers.push($rootScope.user._id);
            $scope.event.whenDate =  new Date($scope.event.whenDate.setHours(0,0,0,0))
            //sliders
            $scope.event.groupSize = $scope.groupSlider.value;
            $scope.event.ageRange.min = $scope.ageSlider.minValue;
            $scope.event.ageRange.max = $scope.ageSlider.maxValue;
            $scope.event.radius = $scope.radiusSlider.value;

            console.log($scope.event);
            
            DB_queries.updateEvent($scope.event).then(function(event){
                console.log('events - edit event',event)
                //remove kicked users

                $scope.removedUsers.forEach(function (user, i) {
                    DB_queries.adminRemoveUserEvent($scope.event._id,user).then(function(event){
                        console.log('remove user - edit event')
                    });
                //$location.url('/event/'+$scope.event._id)
                    });

                DB_queries.getUsersDevices($scope.event.registeredUsers).then(function(data){
                    console.log(data);

                    data.users.forEach(function (user, i){
                            user.devices.forEach(function(id,i){
                                $scope.usersDevices.push(id._id);
                            })
                        });

                    var msg = $rootScope.user.name+" updated "+$scope.event.sportType+" - "+$scope.event.eventTitle+" event, get in to check it out!";
                    if($scope.usersDevices){
                        DB_queries.sendNotifications($scope.usersDevices,msg).then(function(){
                                 console.log("sendNotifications");
                        })
                    }
                    

                })


                 $location.url('/event/'+$scope.event._id)
                } 
            )

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
        $scope.removeFriend = function($index,fbId){
            console.log("cancel invited user " +fbId)
            //$(".btn-danger-outline").addClass('hide');
            //$(".btn-primary-outline").removeClass('hide');
            $scope.removedUsers.push(fbId._id);
            $scope.event.registeredUsers.splice($index, 1);

        }


/*
        fbLogin.getFriends().then(function(friends){
            console.log(friends)
            $scope.friends=friends;
        })

        $scope.getFriends_Next_Prev=function(url){
            fbLogin.getFriends_Next_Prev(url).then(function(friends){
                console.log(friends)
                $scope.friends=friends;
            })
        }*/



});
