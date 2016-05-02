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
        $location.url('/');
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
    .when('/', {
      defaultRoute:true,
      // abstract: true,
      templateUrl: 'views/login.html',
      controller: 'loginCtrl'
    })
    .when('/home',{
      templateUrl: 'views/home.html',
      controller: 'homeCtrl',
      resolve:{
        loggedin : checkLoggedin
      }
    })
    //  .when('/seller_management',{
    //   templateUrl: 'views/seller_management.html',
    //   controller: 'sellerManagementCtrl',
    //   resolve:{
    //     loggedin : checkLoggedin
    //   }
    // })
    //   .when('/old_wash_management',{
    //   templateUrl: 'views/old_wash_management.html',
    //   controller: 'oldWashManagementCtrl',
    //   resolve:{
    //     loggedin : checkLoggedin
    //   }
    // })
    //    .when('/new_wash_management',{
    //   templateUrl: 'views/new_wash_management.html',
    //   controller: 'newWashManagementCtrl',
    //   resolve:{
    //     loggedin : checkLoggedin
    //   }
    // })
    // .when('/manager_chat',{
    //   templateUrl: 'views/manager_chat.html',
    //   controller: 'manager_chatCtrl',
    //   resolve:{
    //     loggedin : checkLoggedin
    //   }
    // })
    .otherwise({
      redirectTo: '/home'
    });

}); 


app.run(function($q, $rootScope, $window, $http, $localStorage, $route, $location,$document, $timeout, fbLogin){

  $rootScope.app = {
    name:'Playz',
    _comment:{
      domain: (document.domain == 'localhost')?'http://localhost:8080/':'https://agile-depths-92655.herokuapp.com/'
    },
    domain: 'https://agile-depths-92655.herokuapp.com/'
  };

  $timeout(function(){
    fbLogin.getStatus()
  },1000);
  //$http.defaults.headers.common.uid = $localStorage.uid;
  //$location.url("/user_management")
  // $http.post($rootScope.app.domain+'validate_admin',$rootScope.admin)
  //     .success(function(data){
  //         console.log("success",data)
  //         if(data.status != 1) return;
          
  //         $rootScope.status=true;
  //     }).error(function(data){$rootScope.status=false; })
  //     ['finally'](function() {
  // });

})


