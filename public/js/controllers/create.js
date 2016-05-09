'use strict';

angular.module('PlayzApp')
    .controller('createCtrl', function($scope, $http, $rootScope, $location) {
        console.log("create controller")

        $("#slider-1").slider({min  : 1, max  : 50, value: 5});
        $("#groupSlider").slider({min  : 1, max  : 50, value: 2});
        $("#ex2").slider({min  : 10, max  : 100, value: [20, 40]});

        $("#ex2").on("slide", function(slideEvt) {
            $("#rangeA").text(slideEvt.value[0]);
            $("#rangeB").text(slideEvt.value[1]);

        });

        $("#groupSlider").on("slide", function(slideEvt) {
            //var r = $("#rangeSizeA");
            $("#rangeSizeA").text(slideEvt.value);
            //document.getElementById("rangeSizeA").innerHTML = slideEvt.value[0];

        });

        $scope.createEvent=function(){
            console.log($scope.event);
        }
    });
