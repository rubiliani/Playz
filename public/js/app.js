'use strict';

/**********************************************************************
 * Angular Application
 **********************************************************************/
var app = angular.module('PlayzApp', ['ngResource','ngRoute','ngStorage','PlayzApp.services']) 
.config(function($routeProvider, $locationProvider, $httpProvider) {
 
  //================================================
  // Check if the user is connected
  //================================================
  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, $localStorage){
    // Initialize a new promise
    var deferred = $q.defer();
    if($rootScope.status) {
        deferred.resolve();
    }
    else {
        deferred.reject();
    }
    return deferred.promise;
  };
  
  //================================================
  // Add an interceptor for AJAX errors
  //================================================
 
  $httpProvider.interceptors.push(function($q, $location, $localStorage) {
    return {
      response: function(response) {
        // do something on success
        return response;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 404)
          console.log("http error, http config, http routeProvider")
        return $q.reject(response);
      }
    };
  });

  //================================================
  // Define all the routes
  //================================================
  $routeProvider
    .when('/',{
      //defaultRoute:true,
      //abstract: true,
      templateUrl: 'views/home.html',
      controller: 'homeCtrl',
      resolve:{
        loggedin : checkLoggedin
      }
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginCtrl',

    })
    .when('/playzcard',{
      templateUrl: 'views/playzCard.html',
      controller: 'playzcardCtrl',
      resolve:{
        loggedin : checkLoggedin
      }
    })
    .otherwise({
      redirectTo: '/'
    });

}); 


app.run(function($q, $rootScope, $window, $http, $localStorage, $route, $location,$document, $timeout, fbLogin,DB_queries){

  $rootScope.app = {
    name:'Playz',
    _comment:{
      domain: (document.domain == 'localhost')?'http://localhost:8080/':'https://agile-depths-92655.herokuapp.com/'
    },
    domain: 'https://agile-depths-92655.herokuapp.com/'
  };
  $rootScope.status=false;
  //TODO improve performance
  $rootScope.$watch("status", function(newValue, oldValue){
    if (newValue){
      //TODO fix the redirection
      $location.url( "/" );
    }
    else{
      $location.url( "/login" );
    }
  });

  fbLogin.getStatus();
  //DB_queries.getEvents().then(function(res){
  //  console.log('getEvents then',res)
  //});
  // register listener to watch route changes
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    console.log("routeChangeStart next->",next.templateUrl)
    if ( next.templateUrl == "views/login.html" ) {
      if ($rootScope.status) {
        event.preventDefault();
      }
    }
    //else if (!next.templateUrl){
    //  $location.url( "/" );
    //}
  });


})


