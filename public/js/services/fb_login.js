'use-strict';
angular.module('PlayzApp.services',['ngResource','ngRoute','ngStorage','ngFacebook'])
.config( function( $facebookProvider ) {
  	$facebookProvider.setAppId('281543515348880');
  	$facebookProvider.setPermissions("email,user_likes");
  	$facebookProvider.setCustomInit({
  		xfbml      : true
	});
})
.service('fbLogin', function($http, $q, $rootScope, $localStorage, $location,$facebook){

  	(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


	// window.fbAsyncInit = function() {
	// 	FB.init({
	// 	  appId      : '281543515348880',
	// 	  cookie     : true,  // enable cookies to allow the server to access the session
	// 	  xfbml      : true,  // parse social plugins on this page
	// 	  version    : 'v2.5' // use version 2.2
	// 	});
	// };

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
  		$facebook.api('/me').then( 
	      function(response) {
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
  		connected=false;
  		$rootScope.status=false;
  		delete $localStorage.userID;
  		$facebook.logout() 
  	}

  	return{
  		getStatus:getStatus,
  		login:login,
  		logout:logout
  	}
})