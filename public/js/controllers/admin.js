'use strict';

angular.module('PlayzApp')
    .controller('adminCtrl', function($scope, $http, $q ,$rootScope, $location,DB_queries,geolocation,$window,fbLogin,$timeout) {
        console.log("admin controller")

        $scope.markers = [];
    $scope.places = [];
    $scope.places.push({lat: 44.99758207, lng: 7.140598296999997, nome: "Vignal", desc: "Easy climb in Chisone Valley"});
    $scope.places.push({lat: 45.0293769, lng: 7.273120879999965, nome: "Parey", desc: "Classical route climbs in Sangone Valley"});
         var self = this;

         var self = this;

      function initialize() {
        console.log("map initialize");
        var options = {
          googleApiKey: 'AIzaSyAZ8q8liXvaY9KiWmcFi5ioVdIgDu21J2M',
          locationColumn: 'geometry',
          map_center: [32.0853, 34.7818],
          locationScope: 'turin'
        };
        options = options || {};
        self.googleApiKey = options.googleApiKey || "";
        self.locationColumn = options.locationColumn || "geometry";
        self.locationScope = options.locationScope || "";
        self.defaultZoom = options.defaultZoom || 10;
        self.map_centroid = new google.maps.LatLng(options.map_center[0], options.map_center[1]);

        self.myOptions = {
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          zoom: self.defaultZoom,
          center: self.map_centroid,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        self.map = new google.maps.Map($("#map")[0], self.myOptions);

        var infoWindow = new google.maps.InfoWindow();

        google.maps.event.addListener(map, 'click', function() {
          infowindow.close();
        });

        //$scope.markers = [];
        var createMarker = function(info) {
         
          var marker = new google.maps.Marker({
            map: self.map,
            position: new google.maps.LatLng(info.location.latitude, info.location.longitude),
            title: info.sportType,
            //date: info.data,
            //imagen: info.imagen,
            //nombre_categoria: info.nombre_categoria
          });
          marker.content = '<div class="infoWindowContent">' + info.eventTitle + '</div>';
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent('<h4>' + marker.title + '</h4>' + marker.content);
            infoWindow.open(self.map, marker);
          });
          $scope.markers.push(marker);
        };

        $scope.updateMap=function(){
           DB_queries.getAdminEvents().then(function (events) {
                $scope.events = events;
                $scope.events.forEach(function (event, i) {
                    createMarker(event)
                   /* $scope.mymap.points.coords.push({
                        point: [event.location.latitude,event.location.longitude],
                        header: event.sportType,
                        body: event.eventTitle
                    });*/
                });
               // console.log( $scope.mymap.points)
            });  

            
        
        }
        if (!$scope.$$phase) $scope.$apply();

        $scope.openInfoWindow = function(e, selectedMarker) {
          console.log('show something');
          e.preventDefault();
          google.maps.event.trigger(selectedMarker, 'click');
        };
      }
      initialize();
      $scope.updateMap();
     

         /*

        $scope.location={lat:32.0853,lng:34.7818,name:''};
       


        $scope.event={
            
            location:{},
            radius:10000,
        };

        $scope.infowindow = {
            position: null,
            header:'',
            body:''
        }  
       
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

        
                    if (e && e.latLng) {
                        $scope.$apply()
                    }
                },
                drag: function(e, p, map, points) {
                    // some action here
                }
            },
            marker:{
                position: null,
                options: function(){
                    return {
                        draggable: false
                    }
                },
                events: {
                    click: function(e, marker, map, markers) {
                        $scope.infowindow.position = e.latLng;
                        $scope.infowindow.header = "rubi"
                         $scope.infowindow.body = "liani"
                        $scope.$apply()
                        console.log(e.latLng.lat() + " " + e.latLng.lng());
                    }
                },
            },
            points:{
              coords: [{point:[],
                        header:'',
                        body:''}
              ],
              options: function(coords, properties, i, map) {
                return {
                  draggable: true
                }
              },
              events: {
                click: function(e, point, map, points) {
                  alert(point)
                }
              },
              decimals: 14
            }
        };

       

    


        $scope.setCurrentLocation=function(){
           geolocation.getCurrentPosition().then(function(val){
                console.log('create page geo',val)
                $scope.location.lat = val.coords.latitude;
                $scope.location.lng = val.coords.longitude;
                $scope.updateMap();
               
           });


        }
        $scope.openme = function(){
            alert("ya habibi")
        }
      
        $scope.updateMap=function(){
           DB_queries.getAdminEvents().then(function (events) {
                $scope.events = events;
                $scope.events.forEach(function (event, i) {

                    $scope.mymap.points.coords.push({
                        point: [event.location.latitude,event.location.longitude],
                        header: event.sportType,
                        body: event.eventTitle
                    });
                });
                console.log( $scope.mymap.points)
            });  

            
        
        }

         $scope.init=function(){
            $timeout(function () {
                $scope.setCurrentLocation();
            },100);
        }
        $scope.init();
        */


    });



