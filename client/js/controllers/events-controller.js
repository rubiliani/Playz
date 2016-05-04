app.controller('eventsController', ['$scope', '$resource', function($scope,$resource) {

   var uid = localStorage.uid;
	var Event = $resource('/api/events/'+uid); 
 	Event.query(function(results){
 		$scope.events = results;
 	});


   var EventOther = $resource('/api/events/other/'+uid); 
   EventOther.query(function(results){
      $scope.otherEvents = results;
      
   });

   var EventTodayOther = $resource('/api/events/today/'+uid); 
   EventTodayOther.query(function(results){
      $scope.otherTodayEvents = results;
      
   });

    var EventTomorrowOther = $resource('/api/events/tomorrow/'+uid); 
   EventTomorrowOther.query(function(results){
      $scope.otherTomorrowEvents = results;
      
   });


    var EventNegotiableOther = $resource('/api/events/negotiable/'+uid); 
   EventNegotiableOther.query(function(results){
      $scope.otherNegotiableEvents = results;
      
   });

      $scope.event = {
        fbUserID: uid,
        _user: '',
        createdDate :'string',
        privacy:'public',
        sport: 'Football',
        level: 'Newbie',
        mindset: 'Just for fun',
        groupSize:'2', 
        position:'',
        radius: '5',
        when:'Today',
        whenDate:'',
        ageRangeMin :'20',
        ageRangeMax :'40',
        genderSelection: 'Co-ed',
        payedSelection: 'OK'
      };
   	$scope.events = [];
    $scope.otherEvents = [];
    $scope.otherNegotiableEvents = [];
    $scope.otherTomorrowEvents = [];
    $scope.otherTodayEvents = [];

   	$scope.createEvent = function(){
   		
         var newEvent = new Event();
         $scope.event._user = currUser;
         $scope.event.createdDate = new Date();
         var rd = $("#publicEvt");
         var checked = $("#publicEvt").is(":checked");
   		   if($("#publicEvt").is(":checked")){
            $scope.event.privacy = "public";
         }
         else{
            $scope.event.privacy = "private";
         }
         $scope.event.ageRangeMin = $("#rangeA").text();
         $scope.event.ageRangeMax = $("#rangeB").text();
         $scope.event.groupSize = $("#rangeSizeA").text();
         $scope.event.radius = $("#slider-1")[0].defaultValue;
         $scope.event.position = {lat: $("#mapLat")[0].text,long: $("#mapLong")[0].text};

   		   
         
         newEvent._user = $scope.event._user;
         newEvent.fbUserID = $scope.event.fbUserID;
         newEvent.createdDate = $scope.event.createdDate;
         newEvent.privacy = $scope.event.privacy;
         newEvent.sport = $scope.event.sport;
         newEvent.level = $scope.event.level;
         newEvent.mindset = $scope.event.mindset;
         newEvent.groupSize = $scope.event.groupSize;
         newEvent.position = $scope.event.position;
         newEvent.radius = $scope.event.radius;
         newEvent.ageRangeMin = $scope.event.ageRangeMin;
         newEvent.ageRangeMax = $scope.event.ageRangeMax;
         newEvent.genderSelection = $scope.event.genderSelection;
         newEvent.payedSelection = $scope.event.payedSelection;
         newEvent.when = $scope.event.when;
         newEvent.regiteredUsers =[]


         //newEvent.regiteredUsers.push({"_user": newEvent._user, "picLink": "https://graph.facebook.com/"+newEvent._user.fbUserID+"/picture?type=large"});

         newEvent.$save(function(result){

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/api/users/events/"+userID+"?_event="+newEvent._id, true);
            
           // var params = "_event="+newEvent._id;
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhttp.send();
            xhttp.onload = function() {
               if (xhttp.readyState === 4) { 
                    if (xhttp.status === 200) {
                        if (xhttp.responseText == "null") {
                         
                          }
                          else
                          {
                            window.location.href = "playzer";
                          
                          }
                         
                      } else {
                          console.error(xhttp.statusText);
                      }
                    }
                  };


   			   
   			});
   		
   	}
}]);
   