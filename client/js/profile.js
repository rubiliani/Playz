

function upcomingView(){
	document.getElementById("upcomingEventsli").className="active";
	document.getElementById("pastEventsli").className = "";
	document.getElementById("upcomingList").className="container m-y-md";

}


function pastView(){
	document.getElementById("upcomingEventsli").className="";
	document.getElementById("pastEventsli").className = "active";
	document.getElementById("upcomingList").className="hide";
	

}