var app = angular.module('Playz',['ngResource']);

var currUser;

var userID = localStorage.uid;// = userID;

var xhttp = new XMLHttpRequest();
xhttp.open("GET", "/api/users/checkExist/"+userID, true);
xhttp.send();
xhttp.onload = function() {
	if (xhttp.readyState === 4) { 
        if (xhttp.status === 200) {
            if (xhttp.responseText == "null") {
                  //window.location.href = "index.html";
              }
              else
              {
              	currUser = JSON.parse(xhttp.response);
               
				        var pic = document.getElementById('profileUserPic');
				        if(pic!=null)
					         pic.src = currUser.profilePic;

                var pic2 = document.getElementById('profileUserPicMin');
                if(pic2!=null)
                   pic2.src = currUser.profilePic;

				        var cover = document.getElementsByClassName("panel-heading");

		
				
				        var profPic = document.getElementsByClassName("panel-profile-img");
				        if(profPic.length>0)
					         profPic[0].src = currUser.profilePic;


                 var uName = document.getElementById('currntUserName');
                 if(uName!=null)
                    uName.innerText = currUser.firstname+" "+currUser.lastname;
              
                 

              }
             
          } else {
              console.error(xhttp.statusText);
          }
        }
      };






(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);

  }
  (document, 'script', 'facebook-jssdk'));


window.fbAsyncInit = function() {
  FB.init({
    appId      : '281543515348880',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use version 2.2
  });

  facebookConnection = FB;
  FB.getLoginStatus(function(response) {
    console.log(response);

});

};

function setLoc(){
  setLocation(currUser.location);
}


