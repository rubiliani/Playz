'use strict';

angular.module('PlayzApp')
.controller('eventCtrl', function($scope,$route, $http, $rootScope, $location,DB_queries,resolveGetEventById,$window,growl,fbLogin,$anchorScroll,$timeout) {
    $scope.event = resolveGetEventById;
    $scope.messages = [];
    $scope.textMsg = "";
    $scope.event.invitedUsers = [];
     $scope.usersDevices = [];
    console.log("event controller",$scope);

    $scope.getMessage = function(){
    	DB_queries.getMessages($scope.event._id).then(function(messages){
				$scope.messages=messages;
    	});

	}

	$scope.createMessage = function(){
		if($scope.textMsg=='')
			return;
		DB_queries.createMessage($rootScope.user._id,$scope.event._id,$scope.textMsg).then(function(messages){
			$scope.textMsg='';
    	});
	}

	$rootScope.$on('newMessageReceivedFromWS', function(event, msg) {
		if ($scope.event._id==msg.event._id){
			$scope.messages.push(msg);
			$scope.$apply();

			if ($rootScope.user.id == msg.sender.id) return;
			growl.info("New message for "+msg.event.eventTitle+" event", {title: 'New Unread Message'});

		}
		else{
			//if ($rootScope.user.id == msg.sender.id) return;
			//growl.warning("This adds a warn message", {title: 'Warning!'});
			if ($rootScope.user.id == msg.sender.id) return;
				growl.info("New chat message in "+msg.event.eventTitle+" event", {title: 'New Unread Message'});
			//growl.success("This adds a success message"); //no title here
			//growl.error("This adds a error message", {title: 'ALERT WE GOT ERROR'});
		}
		//growl.info("New message for "+msg.event.eventTitle+" event", {title: 'New Unread Message'});
	});

  $('#messageModal').on('shown.bs.modal', function (e) {
    $scope.scrollDown();
  })

    $scope.scrollDown=function(){
			console.log('down')
			$timeout(function(){
        var element = $("#msgContainer")[0];
        element.scrollIntoView(false);
			},100)

		}

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

			 DB_queries.getUsersDevicesFbId($scope.event.invitedUsers).then(function(data){
                    console.log(data);

                    data.users.forEach(function (user, i){
                            user.devices.forEach(function(id,i){
                                $scope.usersDevices.push(id._id);
                            })
                        });

                    var msg = $rootScope.user.name+" invited you to "+$scope.event.sportType+" event";
                    if($scope.usersDevices.length>0){
	                    DB_queries.sendNotifications($scope.usersDevices,msg).then(function(){
	                             console.log("sendNotifications");
	                    })
                    }
                    

                })


			$route.reload();
		},
		function(err){
		});
    }

    $scope.requestSchedule=function(){
      
        console.log("reschedule");
        DB_queries.getCreatorDevices($scope.event.creator).then(function(data){
                    console.log(data);

                    data.users.forEach(function (user, i){
                            user.devices.forEach(function(id,i){
                                $scope.usersDevices.push(id._id);
                            })
                        });

                     var msg = $rootScope.user.name+" requested reschedule to "+$scope.event.sportType+" event - "+$scope.event.eventTitle;
                    
                    DB_queries.sendNotifications($scope.usersDevices,msg).then(function(){
                             console.log("sendNotifications");
                    })
                       
                    

                })
		
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


})
	.directive("repeatEnd", function(){
		return {
			restrict: "A",
			link: function (scope, element, attrs) {
				if (scope.$last) {
					scope.$eval(attrs.repeatEnd);
				}
			}
		};
	});
