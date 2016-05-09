
var async = require("async");


module.exports.create = function(req,res){
	console.log(req.body);

	var evt = new Event(req.body);
	evt.save(function(err,result){
		res.json(result);
	});
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












