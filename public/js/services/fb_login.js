'use-strict';
/**
 * https://github.com/GoDisco/ngFacebook
 */
angular.module('PlayzApp.services',['ngResource','ngRoute','ngStorage','ngFacebook'])
.config( function( $facebookProvider ) {
  	$facebookProvider.setAppId('281543515348880');
  	$facebookProvider.setPermissions("public_profile,email,user_friends");
	$facebookProvider.setVersion("v2.0");
  	$facebookProvider.setCustomInit({
  		xfbml      : true
	});


	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

})
.service('fbLogin', function($http, $q, $rootScope, $localStorage, $location,$facebook){

  	var getStatus = function(){
  		console.log("getStatus")
  		$facebook.getLoginStatus().then(function(response){
  			console.log(response);
	    	if (response.status === "connected"){
	    		login(true);
	    	}
  		})
  	}

  	function setData(){
  		$facebook.api('/me?fields=id,email,birthday,first_name,last_name,location,cover,picture').then(
	      function(response) {
            console.log(response)
	        	$rootScope.status=true;
    				$localStorage.userID=response.id;
    				$rootScope.user= response;
    				$location.url("/home");
		      },
		      function(err) {
		        console.log("Please log in")
	      });	
		
  	}

  	var login = function(check){
  		console.log("login")
  		if (check){
			 setData();
  		}
  		else {
  			$facebook.login().then(function(response){
  				console.log(response);
  				if (response.authResponse) {
  			     setData();
  			  }
  			},function(err){
  			     	console.log('User cancelled login or did not fully authorize.');
  			})
  		}
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