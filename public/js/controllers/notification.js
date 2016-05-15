'use strict';

angular.module('PlayzApp')
    .controller('notificationCtrl', function($scope, $http, $rootScope, $location,DB_queries, $window, $document) {
        console.log("notif controller")
        $scope.show_notification =function(){
            return true;
        }
       
    });
