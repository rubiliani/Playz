


function todayView(){
	document.getElementById("todayListView").className="active";
	document.getElementById("tomorrowListView").className = "";
	document.getElementById("negotiableListView").className = "";

	document.getElementById("todayList").className="";
	document.getElementById("tomorrowList").className = "hide";
	document.getElementById("negotiableList").className = "hide";
}


function tomorrowView(){
	document.getElementById("todayListView").className="";
	document.getElementById("tomorrowListView").className = "active";
	document.getElementById("negotiableListView").className = "";

	document.getElementById("todayList").className="hide";
	document.getElementById("tomorrowList").className = "";
	document.getElementById("negotiableList").className = "hide";
}
	

function negotiableView(){
	document.getElementById("todayListView").className="";
	document.getElementById("tomorrowListView").className = "";
	document.getElementById("negotiableListView").className = "active";

	document.getElementById("todayList").className="hide";
	document.getElementById("tomorrowList").className = "hide";
	document.getElementById("negotiableList").className = "";
}
