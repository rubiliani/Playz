app.controller('usersController', ['$scope', '$resource', function($scope,$resource) {


   var uid = localStorage.uid;

	var User = $resource('/api/users'); 
 	User.query(function(results){
 		$scope.users = results;
 	})

   var UserEvents = $resource('/api/users/events/'+uid); 
   UserEvents.query(function(results){
      $scope.userEvents = results;
      
   });

   	$scope.users = []
      $scope.userEvents = []

   	$scope.createUser = function(){
   		var newUser = new User();
   		newUser.name = $scope.userName;
         newUser.title = $scope.userTitle;
   		newUser.$save(function(result){
   			$scope.users.push(result);
   			$scope.userName = "";
            $scope.userTitle = "";
   			});
   		
   	}

      $scope.newUser = function(fullName){
         var newUser = new User();
         newUser.name = fullName;
         
         newUser.$save(function(result){
           
           
            });
         
      }

      
}]);