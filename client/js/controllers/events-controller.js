app.controller('eventsController', ['$scope', '$resource', function($scope,$resource) {

   var uid = localStorage.uid;
	var Event = $resource('/api/events/'+uid); 
 	Event.query(function(results){
 		$scope.events = results;
      

 	})

      $scope.event = {
         sport: 'Football',
         level: 'Newbie',
         mindset: 'Just for fun',
         position:'',
         radius: '5',
         ageRangeMin :'20',
         ageRangeMax :'40',
         genderSelection: 'Male',
         payedSelection: 'OK',
         fbUserId: '',
         when:'Today'
      };
   	$scope.events = [];

   	$scope.createEvent = function(){
   		
         var newEvent = new Event();

   		
         $scope.event.ageRangeMin = $("#rangeA").text();
         $scope.event.ageRangeMax = $("#rangeB").text();
         $scope.event.radius = $("#slider-1")[0].defaultValue;
         $scope.event.position = {lat: $("#mapLat")[0].text,long: $("#mapLong")[0].text};
   		$scope.event.fbUserId = localStorage.uid;
         
         newEvent.fbUserId = $scope.event.fbUserId;
         newEvent.sport = $scope.event.sport;
         newEvent.level = $scope.event.level;
         newEvent.mindset = $scope.event.mindset;
         newEvent.position = $scope.event.position;
         newEvent.radius = $scope.event.radius;
         newEvent.ageRangeMin = $scope.event.ageRangeMin;
         newEvent.ageRangeMax = $scope.event.ageRangeMax;
         newEvent.genderSelection = $scope.event.genderSelection;
         newEvent.payedSelection = $scope.event.payedSelection;
         newEvent.when = $scope.event.when;
         newEvent.regiteredUsers =[]


         newEvent.regiteredUsers.push({"fbUserId": newEvent.fbUserId, "picLink": "https://graph.facebook.com/"+newEvent.fbUserId+"/picture?type=large"});


         newEvent.$save(function(result){

   			    window.location.href = "home";
   			});
   		
   	}
}]);
   