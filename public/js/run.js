'use strict';

angular.module('PlayzApp')
.run(function($q, $rootScope, $window, $http, $localStorage, $route, $location,$document, $timeout, fbLogin){

    $rootScope.status=false;
    $rootScope.app = {
        name:'Playz',
        domain: (document.domain == 'localhost')?'http://localhost:3000/':'https://agile-depths-92655.herokuapp.com/'
    };

    fbLogin.getStatus().then(function(){
        console.log('status received')
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
        //if ( next.templateUrl == "views/login.html" ) {
        //  if ($rootScope.status) {
        //    event.preventDefault();
        //  }
        //}
    });

})