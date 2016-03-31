
 $( "#slider-1" ).on( 'slide', function( event ) { 
    	var value = $( "#slider-1" ).val();
        updateRadius(circle,value);
    });

 function updateRadius(circle, rad){
  circle.setRadius(parseInt(rad)*1000);
}


  var map;
  var circle; 
  function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	center: 
		{lat: 32.0667, lng: 34.800},
	     zoom: 11});



	 var infoWindow = new google.maps.InfoWindow({map: map});
			  // Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
			    lat: position.coords.latitude,
			    lng: position.coords.longitude
			};

			var lat = document.getElementById("mapLat");
			var long = document.getElementById("mapLong");

			lat.text=pos.lat;
			long.text=pos.lng;

			infoWindow.setPosition(pos);
			infoWindow.setContent('You are here');
			map.setCenter(pos);
			circle = new google.maps.Circle({
			    strokeColor: "#5bd75b",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#5bd75b",
			    fillOpacity: 0.35,
			    map: map,
			    radius: 5000,
			    center:pos
			  });
		},function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
			    // Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}

	
	      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
			  infoWindow.setPosition(pos);
			  infoWindow.setContent(browserHasGeolocation ?
			                        'Error: The Geolocation service failed.' :
			                        'Error: Your browser doesn\'t support geolocation.');
			}




	 //global variable, consider adding it to map instead of window

  
};



//var sl = document.getElementById('slider-1');


	
/*
$( "#slider-1" ).on( 'slidestart', function( event ) { 
	console.log("slide");
});

 function updateRadius(circle, rad){
  circle.setRadius(rad);
}
*/


    /*

$( document ).ready( function() {


	


	        var circle; //global variable, consider adding it to map instead of window

  circle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: map,
    radius: 500
  });
  circle.bindTo('center', marker, 'position');

  $( "#slider-1" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 10000,
    min: 500,
    value: 500,
    slide: function( event, ui ) {
     updateRadius(circle, ui.value);
    }
  });

	        var infoWindow = new google.maps.InfoWindow({map: map});

			  // Try HTML5 geolocation.
			  if (navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
			      var pos = {
			        lat: position.coords.latitude,
			        lng: position.coords.longitude
			      };

			      infoWindow.setPosition(pos);
			      infoWindow.setContent('Location found.');
			      map.setCenter(pos);
			    }, function() {
			      handleLocationError(true, infoWindow, map.getCenter());
			    });
			  } else {
			    // Browser doesn't support Geolocation
			    handleLocationError(false, infoWindow, map.getCenter());
			  }
	      }
	      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
			  infoWindow.setPosition(pos);
			  infoWindow.setContent(browserHasGeolocation ?
			                        'Error: The Geolocation service failed.' :
			                        'Error: Your browser doesn\'t support geolocation.');
			}



			

  


function updateRadius(circle, rad){
  circle.setRadius(rad);
}
});


*/
	