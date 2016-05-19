'use strict';

angular.module('PlayzApp')
.controller('eventCtrl', function($scope, $http, $rootScope, $location,resolveGetEventById) {
    $scope.event = resolveGetEventById;
    console.log("event controller",$scope);
});
