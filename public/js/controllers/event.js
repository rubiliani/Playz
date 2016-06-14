'use strict';

angular.module('PlayzApp')
.controller('eventCtrl', function($scope,$route, $http, $rootScope, $location,DB_queries,resolveGetEventById,$window,growl,fbLogin,$anchorScroll) {
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

	$scope.createMessage = function(){
		
		DB_queries.createMessage($rootScope.user._id,$scope.event._id,$scope.textMsg).then(function(messages){
			$scope.textMsg='';
    	});
	}

	$rootScope.$on('newMessageReceivedFromWS', function(event, msg) {
		if ($scope.event._id==msg.event._id){
			$scope.messages.push(msg);
			$scope.$apply();

			if ($rootScope.user.id == msg.sender.id) return;
			growl.info("New chat message in "+msg.event.eventTitle+" event", {title: 'New Unread Message'});
			// $anchorScroll();
			// $("<a>").attr({'href':"#"+msg._id}).trigger('click')
		}
		else{
			//if ($rootScope.user.id == msg.sender.id) return;
			//growl.warning("This adds a warn message", {title: 'Warning!'});
			growl.info("New chat message in "+msg.event.eventTitle+" event", {title: 'New Unread Message'});
			//growl.success("This adds a success message"); //no title here
			//growl.error("This adds a error message", {title: 'ALERT WE GOT ERROR'});
		}
		//growl.info("New message for "+msg.event.eventTitle+" event", {title: 'New Unread Message'});
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



    $scope.inviteUsers=function(){
      
        console.log("inviteUsers");
		DB_queries.inviteFriends($scope.event,$scope.event.invitedUsers).then(function(){
			console.log("done inviting");
			$route.reload();
		},
		function(err){
		});
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
