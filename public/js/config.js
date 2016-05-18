'use strict';

angular.module('PlayzApp')
.config(function($routeProvider, $locationProvider, $httpProvider) {

    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope,fbLogin){
        // Initialize a new promise
        var deferred = $q.defer();
        //fbLogin.routeStatus().then(function(){
        //    deferred.resolve();
        //},function(){
        //    deferred.reject();
        //})
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
            controller: 'registerCtrl',
            templateUrl: 'views/register.html',
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
        .when('/event/:id',{
            templateUrl: 'views/event.html',
            controller: 'eventCtrl',
            resolve:{
                loggedin : checkLoggedin,
                resolveGetEventById: function($q,DB_queries,$route,$window) {
                    return DB_queries.getEventById($route.current.params.id).then(function (event) {
                        return event;
                    },function(){
                        $window.history.back()
                        return false
                    })
                }
            }
        })
        .when('/profile',{
            controller: 'profileCtrl',
            templateUrl: 'views/profile.html',
            resolve:{
                loggedin : checkLoggedin
            }
        })
        .otherwise({
            redirectTo: '/'
        });

});