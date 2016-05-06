'use strict';

angular.module('PlayzApp')
.config(function($routeProvider, $locationProvider, $httpProvider) {

    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
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
            resolve:{
                loggedin : function($rootScope,$location){
                    if (!$rootScope.status){
                        $location.url('/login')
                    }
                    else{
                        $location.url('/')
                    }
                }
            }
        })
        .when('/register',{
            templateUrl: 'views/register.html',
            controller: 'registerCtrl',
            resolve:{
                loggedin : checkLoggedin
            }
        })
        .when('/create',{
            templateUrl: 'views/create.html',
            controller: 'createCtrl',
            resolve:{
                loggedin : checkLoggedin
            }
        })
        .when('/event',{
            templateUrl: 'views/event.html',
            controller: 'eventCtrl',
            resolve:{
                loggedin : checkLoggedin
            }
        })
        .when('/profile',{
            templateUrl: 'views/profile.html',
            controller: 'profileCtrl',
            resolve:{
                loggedin : checkLoggedin
            }
        })
        .otherwise({
            redirectTo: '/'
        });

});