'use strict';

angular.module('PlayzApp')
    .controller('adminCtrl', function($scope, $http, $q ,$rootScope, $location,DB_queries,geolocation,$window,fbLogin,$timeout) {
        console.log("admin controller")

        $scope.userMarkers = [];
        $scope.eventMarkers = [];
        $scope.numberOfMales = 0;
        $scope.numberOfFemales=0;

        $scope.sports=[{name:"Baseball"},{name:"Basketball"},{name:"Boxing"},{name:"Chess"},{name:"Cycling"},{name:"Fishing"},{name:"Football"},
            {name:"Golf"},{name:"Hockey"},{name:"Ping-Pong"},{name:"Pool"},{name:"Running"},{name:"Soccer"},{name:"Surfing"},{name:"Swimming"}
            ,{name:"Tennis"},{name:"Volleyball"}];

        $scope.Baseball=0;
        $scope.Basketball=0;
        $scope.Boxing=0;
        $scope.Chess=0;
        $scope.Cycling=0;
        $scope.Fishing=0;
        $scope.Football=0;
        $scope.Golf=0;
        $scope.Hockey=0;
        $scope.PingPong=0;
        $scope.Pool=0;
        $scope.Running=0;
        $scope.Soccer=0;
        $scope.Surfing=0;
        $scope.Swimming=0;
        $scope.Tennis=0;
        $scope.Volleyball=0;
    
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

        var ctx = document.getElementById("myChart");
        $scope.eventsChart = new Chart(ctx, {
           type: 'pie',
          data: {
                labels: ["Baseball","Basketball","Boxing","Chess","Cycling","Fishing","Football","Golf","Hockey","Ping-Pong","Pool","Running","Soccer","Surfing","Swimming","Tennis","Volleyball"],
                datasets: [{
                    label: '# of events',
                    data: [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0],
                    backgroundColor: [
                        '#68721b',
                        '#f76921',
                        '#a06016',
                        '#54d6fa',
                        '#3b3a26',
                        'rgba(255, 99, 132, 0.2)',
                        '#701e12',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        '#ec1d23',
                        'rgba(255, 99, 132, 0.2)',
                        '#1d2b58',
                        '#4a9a45',
                        '#d8e20f',
                        '#4a9a45',
                        '#d8e20f',
                        '#1144c4'
                    ],
                    borderColor: [
                         '#68721b',
                        '#f76921',
                        '#a06016',
                        '#54d6fa',
                        '#3b3a26',
                        'rgba(255, 99, 132, 0.2)',
                        '#701e12',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        '#ec1d23',
                        'rgba(255, 99, 132, 0.2)',
                        '#1d2b58',
                        '#4a9a45',
                        '#d8e20f',
                        '#4a9a45',
                        '#d8e20f',
                        '#1144c4'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

        var ctx3 = document.getElementById("myChart3");
        $scope.usersChart = new Chart(ctx3, {
         type: 'bar',
          data: {
                labels: ["Female", "Male"],
                datasets: [{
                    label: '# of Users',
                    data: [0, 0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });


       


        //$scope.markers = [];
        var createEventMarker = function(info) {
         
          var image = {
            url: "assets/img/"+info.sportType+".png", //assets/img/{{card.sportType}}.png
            scaledSize : new google.maps.Size(42, 42)
          };
          var newLat = info.location.latitude + (Math.random() -.5) / 5000;// * (Math.random() * (max - min) + min);
          var newLng = info.location.longitude + (Math.random() -.5) / 5000;// * (Math.random() * (max - min) + min);
          var marker = new google.maps.Marker({
           // map: self.map,

            position: new google.maps.LatLng(newLat, newLng),
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

          var newLat = info.hometown.latitude + (Math.random() -.5) / 5000;// * (Math.random() * (max - min) + min);
          var newLng = info.hometown.longitude + (Math.random() -.5) / 5000;// * (Math.random() * (max - min) + min);
       
          var marker = new google.maps.Marker({
            //map: self.map,
            position: new google.maps.LatLng(newLat, newLng),
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
                 $scope.calculateEvents();
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
                $scope.calculateUsers();
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

      $scope.calculateUsers =function(){
        $scope.users.forEach(function (user, i) {
            if(user.gender=="male")
               $scope.numberOfMales++;
            else
               $scope.numberOfFemales++;
         });
      }

      $scope.calculateEvents = function(){
         
         $scope.events.forEach(function (events, i) {
          switch(events.sportType){
            case "Baseball":
                $scope.Baseball++;
                break;
            case "Basketball":
                $scope.Basketball++;
                break;
            case "Boxing":
                $scope.Boxing++;;
                break;
            case "Chess":
                $scope.Chess++;;
                break;
            case "Cycling":
                $scope.Cycling++;;
                break;
            case "Fishing":
                $scope.Fishing++;;
                break;
            case "Football":
                $scope.Football++;;
                break;
            case "Golf":
                $scope.Golf++;;
                break;
            case "Hockey":
                $scope.Hockey++;;
                break;
            case "Ping-Pong":
                $scope.PingPong++;;
                break;
            case "Pool":
                $scope.Pool++;;
                break;
            case "Running":
                $scope.Running++;;
                break;
            case "Soccer":
                $scope.Soccer++;;
                break;
            case "Surfing":
                $scope.Surfing++;;
                break;
            case "Swimming":
                $scope.Swimming++;;
                break;
            case "Tennis":
                $scope.Tennis++;;
                break;
            case "Volleyball":
                $scope.Volleyball++;;
                break;
              }
          });

         $scope.usersChart.data.datasets[0].data[0] =  $scope.numberOfFemales;
         $scope.usersChart.data.datasets[0].data[1] =  $scope.numberOfMales;


         $scope.eventsChart.data.datasets[0].data[0] =  $scope.Baseball;
         $scope.eventsChart.data.datasets[0].data[1] =  $scope.Basketball;
         $scope.eventsChart.data.datasets[0].data[2] =  $scope.Boxing;
         $scope.eventsChart.data.datasets[0].data[3] =  $scope.Chess;
         $scope.eventsChart.data.datasets[0].data[4] =  $scope.Cycling;
         $scope.eventsChart.data.datasets[0].data[5] =  $scope.Fishing;
         $scope.eventsChart.data.datasets[0].data[6] =  $scope.Football;
         $scope.eventsChart.data.datasets[0].data[7] =  $scope.Golf;
         $scope.eventsChart.data.datasets[0].data[8] =  $scope.Hockey;
         $scope.eventsChart.data.datasets[0].data[9] =  $scope.PingPong;
         $scope.eventsChart.data.datasets[0].data[10] =  $scope.Pool;
         $scope.eventsChart.data.datasets[0].data[11] =  $scope.Running;
         $scope.eventsChart.data.datasets[0].data[12] =  $scope.Soccer;
         $scope.eventsChart.data.datasets[0].data[13] =  $scope.Surfing;
         $scope.eventsChart.data.datasets[0].data[14] =  $scope.Swimming;
         $scope.eventsChart.data.datasets[0].data[15] =  $scope.Tennis;
         $scope.eventsChart.data.datasets[0].data[16] =  $scope.Volleyball;
        

         $scope.usersChart.update();
         $scope.eventsChart.update()
      }


        initialize();
      $scope.updateMap();


    });



