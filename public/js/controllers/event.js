'use strict';

angular.module('PlayzApp')
.controller('eventCtrl', function($scope, $http, $rootScope, $location,DB_queries,resolveGetEventById,$window,growl,fbLogin,$anchorScroll) {
    $scope.event = resolveGetEventById;
    $scope.messages = [];
    $scope.textMsg = "";
    $scope.event.invitedUsers = [];
    console.log("event controller",$scope);

    $scope.getMessage = function(){
    	DB_queries.getMessages($scope.event._id).then(function(messages){
			$scope.messages=messages;
			
			    
    	});
    //$anchorScroll();
	}

	$scope.createMessage = function(txt){
		if(txt=='')
			return;
		DB_queries.createMessage($rootScope.user._id,$scope.event._id,txt).then(function(messages){
			
			 $('.input').val("");
			txt='';
    	});
	}

	$rootScope.$on('newMessageReceivedFromWS', function(event, msg) {
		if ($scope.event._id==msg.event){
			$scope.messages.push(msg);
			$scope.$apply()
			//$anchorScroll();
		}
		else{
			//growl.warning("This adds a warn message", {title: 'Warning!'});
			//growl.info("New message for "+event.eventTitle+" event", {title: 'New Message'});
			//growl.success("This adds a success message"); //no title here
			//growl.error("This adds a error message", {title: 'ALERT WE GOT ERROR'});
		}
	});
	
    

	$scope.leaveEvent=function(card){
		console.log("leave ",card)
		DB_queries.leaveEvent(card._id).then(function(){
				var index = $rootScope.user.registeredEvents.indexOf(card._id);
				if (index != -1){
					$rootScope.user.registeredEvents.splice(index,1);
				}
				$window.history.back();
			},
			function(err){

			});
	}
	$scope.goBack=function(card){
		$window.history.back();

	}

	$scope.share = function(){
		fbLogin.sharePost();
	}

	$scope.invite = function(){
		fbLogin.inviteFriends();
	}

	$scope.editEvent=function(){
      
        $location.url('/edit/'+ $scope.event._id);
    }



    $scope.closing=function(){
      
        console.log("close");
    }

     $scope.inviteFriend = function(fbId,friend){
            console.log("invited user " +fbId)
            $scope.event.invitedUsers.push(fbId);
          	friend.added=true;
            //$(".btn-danger-outline").removeClass('hide');
            //$(".btn-primary-outline").addClass('hide');

            /*
            DB_queries.inviteFriend($scope.event,fbId).then(function(event){
                console.log('friend invited',event)
              
            })*/

        }
        $scope.cancelInviteFriend = function($index,friend){
            console.log("cancel invited user " +friend.id)
            //$(".btn-danger-outline").addClass('hide');
            //$(".btn-primary-outline").removeClass('hide');
            $scope.event.invitedUsers.splice($index, 1);
          friend.added=false;


        }

	    fbLogin.getFriends().then(function(friends){
	            console.log(friends)

	            $scope.friends=friends;
	            
	            $scope.event.registeredUsers.forEach(function (user, i) {

	            	$scope.friends.data.forEach(function(fbUser,ind){
	            		if(user.id==fbUser.id)
	            			$scope.friends.data.splice(ind, 1);     
	            	});
	            });
	        })

     	$scope.getMessage();
     //$location.hash('bottom');


});
