app.controller('sportsController', ['$scope', '$resource', function($scope,$resource) {

	var Sport = $resource('/api/sports'); 
 	Sport.query(function(results){
 		$scope.sports = results;
 	})

   	$scope.sports = []

}]);