var translateTime = function(whenDate){

	var d = new Date();
	switch(whenDate){
		case "Today":
			return d.getDate()+"/"+d.getMonth()+"/"+d.getUTCFullYear();
		case "Tomorrow":
			d.setDate(d.getDate()+1);
			return d.getDate()+"/"+d.getMonth()+"/"+d.getUTCFullYear();
		case "Negotiable":
			return "01/01/1970";
	}
}