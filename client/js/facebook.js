  var myParam = location.search.split('logout=')[1];
  var accessToken;
//var app = angular.module('Playz',['ngResource']);
  
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {

    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      var accessToken = response.authResponse.accessToken;
      
      if(myParam=="1")
      {
        console.log('logged out');
        FB.logout();
        //window.location.href = "index.html";
      }
      else{
        testAPI();
      }
      /*
      else
      {
        window.location.href = "home.html";
      }*/
      
    } else if (response.status === 'not_authorized') {
       console.log('not_authorized');
     
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
       console.log('not and not');


     
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.

function facebookLogin(){
  myParam = "0";
  FB.login(function(response) {
    if (response.authResponse) {
      /*
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
        checkLoginState();
      });*/
          checkLoginState();                     
    }
  });
}


  function checkLoginState() {

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '281543515348880',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.


  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);

  });


  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);

  }
  (document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {

    var xhttp = new XMLHttpRequest();
    uID = '';
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=id,email,birthday,first_name,last_name,location,cover', function(response) {
      console.log('Successful login for: ' + response.name);
      uID = response.id;
      localStorage.clear();
      localStorage.uid = uID;
      console.log(uID);

      xhttp.onload = function() {
        if (xhttp.readyState === 4) { 
          if (xhttp.status === 200) {
            if (xhttp.responseText == "null") 
            {
              
                var http = new XMLHttpRequest();
                var url = "/api/users";
                var profPic = "https://graph.facebook.com/"+uID+"/picture?type=large";
                var cover = "";
                if(response.location!=undefined)
                  var location = response.location.name;
                else
                  var location = "undefined";
                var params = "firstname="+response.first_name+"&lastname="+response.last_name+"&email="+response.email+"&fbUserID="+response.id+
                  "&location="+location+"&birthday="+response.birthday+"&coverPic="+cover+"&profilePic="+profPic;
                http.open("POST", url, true);

                //Send the proper header information along with the request
                http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                //http.setRequestHeader("Content-length", params.length);
                //http.setRequestHeader("Connection", "close");

                http.onreadystatechange = function() 
                {//Call a function when the state changes.
                  if(http.readyState == 4 && http.status == 200) 
                  {
                      window.location.href = "register";
                  }
                }
                http.send(params);
                
               
            }
            else
            {
                window.location.href = "home";
            }
             
          } else {
              console.error(xhttp.statusText);
          }
        }
      };

      xhttp.open("GET", "/api/users/checkExist/"+uID, true);
      xhttp.send();

    

        //here we will fetch the profile pic.
        //and check if the user is new or comming back.
    });

  }




