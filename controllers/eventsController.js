
var async = require("async");




module.exports.create = function(req,res){
	var event = req.body.event;
	if (!event){
		return res.json({status:0,msg:['no event']})
	}

	event.registeredUsers.push(req.user._id);
	Event.update_event(event,function(result){
		if (!result.status){
			return res.json(result);
		}
		req.user.userEvents.push(result.event._id);
		req.user.registeredEvents.push(result.event._id);
		req.user.save();

		return res.json(result);
	})
	// var evt = new Event(req.body.event);
	// evt.save(function(err,result){
	// 	res.json(result);
	// });
}



exports.createEvent = function(req,res,next){
	var r = {msg:[],status:0};
	//var event = req.body.event;
	var evt = req.body.event;
	console.log("in create event: "+evt);

	Event.create_event(evt,function(err,result){
		res.json(result);
	});

/*
	if (!event || typeof(event) !== 'object' || !user.id){
		r.msg.push('user not exist or user id not found',user);
		return res.json(r);
	}
*//*
	Event.create_event(event,function(result){
		//if (result.status==1 && (!result.user.birthday || !result.user.hometown.name)){
		//	result.newUser=true;
		//}
		return res.json(result)
	});*/
}


module.exports.getList = function(req,res){
	var id = req.params.id;
	var populateQuery = [{path:'_user'}, {path:'regiteredUsers._user'}];
	console.log(id);
	
	Event.find({id : id}, function(err,results){
		res.json(results);
	}).populate(populateQuery)
			.exec(function (err, event) {
  				if (err) return handleError(err);
			});
}



exports.getOtherList = function(req,res){
	var id = req.params.id;

	var populateQuery = [{path:'user'}, {path:'registeredUsers.user'}];
	console.log(id);

	Event.find({id:{ $ne : id}}, function(err,results){
			res.json(results);
		}).populate(populateQuery)
			.exec(function (err, event) {
  				if (err) return handleError(err);
			});



}


module.exports.getTodayOtherList = function(req,res){
	var id = req.params.id;

	var populateQuery = [{path:'_user'}, {path:'regiteredUsers._user'}];
	console.log(id);

	Event
		.find({$and:[{fbUserID:{ $ne : id}},{when:"Today"}]}, function(err,results){
			res.json(results);
		}).populate(populateQuery)
			.exec(function (err, event) {
  				if (err) return handleError(err);
			});



}
module.exports.getTomorrowOtherList = function(req,res){
	var id = req.params.id;

	var populateQuery = [{path:'_user'}, {path:'regiteredUsers._user'}];
	console.log(id);

	Event
		.find({$and:[{fbUserID:{ $ne : id}},{when:"Tomorrow"}]}, function(err,results){
			res.json(results);
		}).populate(populateQuery)
			.exec(function (err, event) {
  				if (err) return handleError(err);
			});



}
module.exports.getNegotOtherList = function(req,res){
	var id = req.params.id;

	var populateQuery = [{path:'_user'}, {path:'regiteredUsers._user'}];
	console.log(id);

	Event
		.find({$and:[{fbUserID:{ $ne : id}},{when:"Negotiable"}]}, function(err,results){
			res.json(results);
		}).populate(populateQuery)
			.exec(function (err, event) {
  				if (err) return handleError(err);
			});



}

module.exports.addUser = function(req,res){
	var id = req.params.id;
	console.log("evt id "+id);
	console.log("link user to evt: "+ req.query._user);

	Event.findOneAndUpdate({ _id : id}, {$addToSet : {regiteredUsers: {_user : req.query._user}}}, function (err, model) {
    	console.log(model);
    	res.status(200).send();
	});
}






exports.getUpcomingEvents = function(req,res){
	res.json({"getUpcomingEvents":"NOT READY"})
}
exports.getPastEvents = function(req,res){
	res.json({"getPastEvents":"NOT READY"})
}







