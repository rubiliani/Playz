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
              
                  updateRegisterView();

              }
             
          } else {
              console.error(xhttp.statusText);
          }
        }
      };


function updateRegisterView(){
  var email = document.getElementById("userEmail");
  var birth = document.getElementById("userBirth");
  var home = document.getElementById("userHome");
  if(currUser.email!="undefined")
    email.value = currUser.email;
  if(currUser.birthday!="undefined")
      birth.value = new Date(currUser.birthday).yyyymmdd();
  if(currUser.location!="undefined")
    home.value = currUser.location;

}

Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear();
   var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
   var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
   return "".concat(yyyy+"-").concat(mm+"-").concat(dd);
  };



function saveUserParams(){

    var email = document.getElementById("userEmail");
    var birth = document.getElementById("userBirth");
    var home = document.getElementById("userHome");

    var http = new XMLHttpRequest();
    
    var params = "email="+email.value+"&birth='"+birth.value+"'&location="+home.value;
    var url = "/api/users/update/"+userID+"?"+params;
    http.open("GET", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //http.setRequestHeader("Content-length", params.length);
    //http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() 
    {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) 
      {
          window.location.href = "home";
      }
    }
    http.send();



}



