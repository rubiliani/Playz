'use strict';

angular.module('PlayzApp')
.run(function($q, $rootScope, $window, $http, $localStorage, $route, $location,$document, $timeout, fbLogin,Sockets){

    $rootScope.status=false;
    $rootScope.app = {
        name:'Playz',
        domain: (document.domain == 'localhost')?'http://localhost:3000/':'https://playzapp.herokuapp.com/'
    };

    fbLogin.getStatus().then(function(user){
        console.log('status received',user);
        if (user.newUser){
            $location.url( "/register" );
        }

        Sockets.connect($rootScope.app.domain,user._id)
        $rootScope.getNotifications()
        $route.reload();

    });

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        console.log("routeChangeStart next->",next.templateUrl)
        fbLogin.routeStatus().then(function(){
            console.log('route status connected')
        },function(){
            console.log('route status disconnected')
            event.preventDefault();
            $location.url('/login')
        })
    });


})