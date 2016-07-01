'use strict';

angular.module('PlayzApp')
    .controller('adminCtrl', function($scope, $http, $q ,$rootScope, $location,DB_queries,geolocation,$window,fbLogin,$timeout) {
        console.log("admin controller")

        $scope.userMarkers = [];
        $scope.eventMarkers = [];
    
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
        var createEventMarker = function(info) {
         
          var image = {
            url: "assets/img/"+info.sportType+".png", //assets/img/{{card.sportType}}.png
            scaledSize : new google.maps.Size(42, 42)
          };
          var marker = new google.maps.Marker({
           // map: self.map,
            position: new google.maps.LatLng(info.location.latitude, info.location.longitude),
            title: info.sportType
            //icon: image
            //date: info.data,
            //imagen: info.imagen,
            //nombre_categoria: info.nombre_categoria
          });
          marker.content = '<div class="infoWindowContent">' + info.eventTitle + '</div><br><IMG BORDER="0" style="width:50px;height:50px;" SRC="'+image.url+'">';
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent('<h5>' + marker.title + '</h5>' + marker.content);
            infoWindow.open(self.map, marker);
          });
          $scope.eventMarkers.push(marker);
        };


        var createUserMarker = function(info) {
         var image = '';
         if(info.gender=="male"){
           image = {
            url: "assets/img/man.png",
            scaledSize : new google.maps.Size(52, 52)
          };
        }
        else{
           var image = {
            url: "assets/img/woman.png",
            scaledSize : new google.maps.Size(52, 52)
          };
        }

       
          var marker = new google.maps.Marker({
            //map: self.map,
            position: new google.maps.LatLng(info.hometown.latitude, info.hometown.longitude),
            title: info.name,
            icon: image
            //date: info.data,
            //imagen: info.imagen,
            //nombre_categoria: info.nombre_categoria
          });
          marker.content = '<div class="infoWindowContent">' + info.eventTitle + '</div>';
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent('<h5>' + marker.title + '</h5>' +info.hometown.name+ '<br><IMG BORDER="0" style="width:90px;height:90px;" SRC="'+info.picture.data.url+'">');
            infoWindow.open(self.map, marker);
          });
          $scope.userMarkers.push(marker);
        };

        $scope.updateMap=function(){
           DB_queries.getAdminEvents().then(function (events) {
                $scope.events = events;
                $scope.events.forEach(function (event, i) {
                    createEventMarker(event)
                   /* $scope.mymap.points.coords.push({
                        point: [event.location.latitude,event.location.longitude],
                        header: event.sportType,
                        body: event.eventTitle
                    });*/
                });
                $scope.showEvents();
               // console.log( $scope.mymap.points)
            });  


            DB_queries.getAllUsers().then(function (users) {
                $scope.users = users;
                $scope.users.forEach(function (user, i) {
                    createUserMarker(user)
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


      $scope.showEvents = function(){
          $scope.userMarkers.forEach(function(marker){
              marker.setMap(null);
          });
          $scope.eventMarkers.forEach(function(marker){
              marker.setMap(self.map);
          });
      }

      $scope.showUsers = function(){
          $scope.userMarkers.forEach(function(marker){
              marker.setMap(self.map);
          });
          $scope.eventMarkers.forEach(function(marker){
              marker.setMap(null);
          });
      }


        initialize();
      $scope.updateMap();

     

    });



