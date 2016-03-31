var app = angular.module('Playz',['ngResource']);

var currUser;
/*
// Parse URL Queries
function url_query( query ) {
    query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var expr = "[\\?&]"+query+"=([^&#]*)";
    var regex = new RegExp( expr );
    var results = regex.exec( window.location.href );
    if ( results !== null ) {
        return results[1];
    } else {
        return false;
    }
}
*/

// Example usage - /?load=yes
//var userID = url_query('id');

//var pic = document.getElementById('profileUserPic');
//pic.src = 'https://graph.facebook.com/'+userID+'/picture?type=large';

//localStorage.clear();


var userID = localStorage.uid;// = userID;

var xhttp = new XMLHttpRequest();
xhttp.open("GET", "/api/users/checkExist/"+userID, true);
xhttp.send();
xhttp.onload = function() {
	if (xhttp.readyState === 4) { 
        if (xhttp.status === 200) {
            if (xhttp.responseText == "null") {
             
              }
              else
              {
              	currUser = JSON.parse(xhttp.response);
               
				var pic = document.getElementById('profileUserPic');
				if(pic!=null)
					pic.src = currUser.profilePic;

				var cover = document.getElementsByClassName("panel-heading");
				//if(cover.length>0)
				//	cover[0].style.backgroundImage = "url("+currUser.coverPic+")";

				
				var profPic = document.getElementsByClassName("panel-profile-img");
				if(profPic.length>0)
					profPic[0].src = currUser.profilePic;
              
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