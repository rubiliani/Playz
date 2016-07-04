'use strict';

angular.module('PlayzApp')
    .controller('chatCtrl', function($scope, $http, $route,$rootScope, $location,DB_queries,$timeout,growl) {
        console.log("chatCtrl controller")
        $rootScope.messages = [];
     //  $rootScope.$apply();

        $rootScope.$on('newMessageReceivedFromWS', function(event, msg) {
            $rootScope.exist = false;
            //if ($rootScope.user.id == msg.sender.id) return;
            //growl.warning("This adds a warn message", {title: 'Warning!'});


            if ($rootScope.user.id == msg.sender.id) return;

            $rootScope.messages.forEach(function(msgs){
                if(msgs.event._id == msg.event._id){
                    $rootScope.exist = true;
                    msgs.event.count++;
                }
            })
            
            if($rootScope.exist==false) {
                    msg.event.count = 1;
                  $rootScope.messages.push(msg);
                $scope.$apply();
            }
            
            
               // growl.info("New chat message in "+msg.event.eventTitle+" event", {title: 'New Unread Message'});



            //growl.success("This adds a success message"); //no title here
            //growl.error("This adds a error message", {title: 'ALERT WE GOT ERROR'});
        
        //growl.info("New message for "+msg.event.eventTitle+" event", {title: 'New Unread Message'});
    });

        $scope.openEvent = function(message,index){
            $rootScope.messages.splice(index,1);
           $('#chatModal').modal('hide')
            $location.url('/event/'+ message.event._id);
        }

        $scope.clearAll = function(){
            $rootScope.messages = [];
        }

});

