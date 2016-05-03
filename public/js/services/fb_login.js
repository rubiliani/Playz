'use-strict';
/**
 * https://github.com/GoDisco/ngFacebook
 */
angular.module('PlayzApp.services',['ngResource','ngRoute','ngStorage','ngFacebook'])
.config( function( $facebookProvider ) {
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

  	$facebookProvider.setAppId('281543515348880');
  	$facebookProvider.setPermissions("public_profile,email,user_friends");
	$facebookProvider.setVersion("v2.0");
  	$facebookProvider.setCustomInit({
  		xfbml:true,
		cookie:true
	});

})
.service('fbLogin', function($http, $q, $rootScope, $localStorage, $location,$facebook){

  	var getStatus = function(){
  		console.log("getStatus")
		$facebook.getLoginStatus().then(function(response){
  			console.log('getLoginStatus',response);
	    	if (response.status === "connected"){
	    		getUserData()
	    	}
			else{
				$rootScope.status=false;
			}
  		})
  	}

  	function getUserData(){
		//var deferred = $q.defer();
  		//return
		$facebook.api('/me?fields=id,email,birthday,first_name,last_name,location,cover,picture').then(
	      function(response) {
            console.log('api',response)
	        		$rootScope.status=true;
    				$localStorage.userID=response.id;
    				$rootScope.user= response;
			  		//deferred.resolve(true);
		      },
		      function(err) {
		        	console.log("Please log in");
				  	$rootScope.status=false;
				    //deferred.reject(false);
	      });	
		
  	}

  	var login = function(loggedIn){
		//var deferred = $q.defer();
  		console.log("login")
		//return
		$facebook.login().then(function(response){
			console.log('login',response);
			if (response.authResponse) {
				getUserData()
						//.then(function(){
					//deferred.resolve(true);
				//});
		  	}
		},function(err){
			$rootScope.status=false;
			console.log('User cancelled login or did not fully authorize.');
			//deferred.reject(false);
		})
  	}

  	var logout = function(){
  		$rootScope.status=false;
  		delete $localStorage.userID;
  		$facebook.logout().then(function(response){ }); 
  	}

  	return{
  		getStatus:getStatus,
  		login:login,
  		logout:logout
  	}
})