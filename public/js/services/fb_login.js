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
  	$facebookProvider.setPermissions("public_profile,email,user_friends,user_hometown,user_location,user_birthday");
	$facebookProvider.setVersion("v2.6");
  	$facebookProvider.setCustomInit({
  		xfbml:true,
		cookie:true
	});

})
.service('fbLogin', function($http, $q, $rootScope, $localStorage, $location,$facebook, DB_queries){
	var isLoggedIn = false;

	var _routeStatus = function(){
		var deferred = $q.defer();
		if (isLoggedIn){
			deferred.resolve();
		}
		$facebook.getLoginStatus().then(function(response){
			console.log('get route status',response);
			if (response.status === "connected"){
				isLoggedIn=true;
				deferred.resolve(true);
			}
			else{
				isLoggedIn=false;
				deferred.reject(false);
			}
		})
		return deferred.promise;
	}

  	var getStatus = function(){
  		console.log("getStatus")
		var deferred = $q.defer();
		$facebook.getLoginStatus().then(function(response){
  			console.log('getLoginStatus',response);
	    	if (response.status === "connected"){
				$rootScope.status=true;
	    		getUserData().then(function(user){
					deferred.resolve(user);
				})
	    	}
			else{
				$rootScope.status=false;
				deferred.reject(false);
			}
  		})
		return deferred.promise;
  	}

  	function getUserData(){
		var deferred = $q.defer();
  		$facebook.api('/me?fields=id,email,birthday,gender,age_range,name,first_name,last_name,location,cover{source},picture.type(large){url}').then(
	      function(response) {
				  console.log('api',response)
				  isLoggedIn=true;
				  $rootScope.status=true;
				  $localStorage.userID=response.id;

				  if (response.birthday){
					  response.birthday = new Date(response.birthday);
				  }
			  console.log(response)
					$http.defaults.headers.common.uid = response.id;
					DB_queries.updateUser(response).then(function(user){
						console.log('user from the server - ',user)
						$rootScope.user=user;
						deferred.resolve(user);
					});

		      },
		      function(err) {
		        	console.log("Please log in");
				  	$rootScope.status=false;
				    deferred.reject(err);
	      });
		return deferred.promise;
  	}

	var _getFriends = function(){
		var deferred = $q.defer();
		$facebook.api('/me/friends?fields=id,email,name,picture{url},cover{source}&limit=5&offset=0').then(
			function(response) {
				console.log('friends',response)
				deferred.resolve(response)
			},
			function(err) {
				console.log("friends");
				deferred.reject(err);
			});
		return deferred.promise;
	}

		var _getAllFriends = function(){
		var deferred = $q.defer();
		$facebook.api('/me/friends?fields=id,email,name,picture{url},cover{source}&limit=100&offset=0').then(
			function(response) {
				console.log('friends',response)
				deferred.resolve(response)
			},
			function(err) {
				console.log("friends");
				deferred.reject(err);
			});
		return deferred.promise;
	}
	var _getFriends_Next_Prev = function(url){
		var deferred = $q.defer();
		$http.get(url)
			.success(function (data) {
				console.log("getFriends_Next_Prev success", data)
				deferred.resolve(data);
			}).error(function (err) {
			console.log("getFriends_Next_Prev err", err)
			deferred.reject(err);
		})
			['finally'](function () {

		});
		return deferred.promise;
	}

  	var login = function(){
		var deferred = $q.defer();
  		console.log("login")
		$facebook.login().then(function(response){
			console.log('login',response);
			if (response.authResponse) {
				getUserData().then(function(user){
					deferred.resolve(user);
				})
		  	}
		},function(err){
			$rootScope.status=false;
			console.log('User cancelled login or did not fully authorize.');
			deferred.reject(err);
		})
		return deferred.promise;
  	}

  	var logout = function(){
		isLoggedIn=false;
  		$rootScope.status=false;
  		delete $localStorage.userID;
  		$facebook.logout().then(function(response){ });
  	}

  	var _sharePost = function(){
		var deferred = $q.defer();
		$facebook.ui({
		    method: 'share',
		    display: 'touch',
		    mobile_iframe:"true",
		    href: 'https://playzapp.herokuapp.com',
		  }, function(response){});
		return deferred.promise;
	}

	var _inviteFriends = function(){
		var deferred = $q.defer();
		FB.ui({method: 'apprequests',
		  message: 'YOUR_MESSAGE_HERE'
		}, function(response){
		  console.log(response);
		});
		return deferred.promise;
	}

	

  	return{
  		getStatus:getStatus,
  		login:login,
  		logout:logout,
		routeStatus:_routeStatus,
		getFriends:_getFriends,
		getAllFriends:_getAllFriends,
		getFriends_Next_Prev:_getFriends_Next_Prev,
		sharePost:_sharePost,
		inviteFriends:_inviteFriends
  	}
})