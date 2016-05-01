
var User = require ('../models/user')
var moment = require('moment')

module.exports.create = function(req,res){
	console.log(req.body);


	var usr = new User(req.body);
	usr.save(function(err,result){
		res.json(result);
	});
}

module.exports.getList = function(req,res){
	User.find({}, function(err,results){
		res.json(results);
	})
}

module.exports.remove = function(req,res){
	var id = req.params.id;
	User.findOneAndRemove({ _id : id}, function (err, model) {
    	console.log(model);
    	res.status(200).send();
	});
}

module.exports.getMyEventList = function(req,res){
	var id = req.params.id;
	var populateQuery = [{path:'regiteredEvents._event'},{path:'regiteredEvents._event._user'}];
	console.log(id);
	
	User.find({fbUserID : id}, function(err,results){
		res.json(results);
	}).populate(populateQuery)
			.exec(function (err, event) {
  				if (err) return handleError(err);
			});
}

module.exports.update = function(req,res){
	var id = req.params.id;
	var email = req.query.email;
	console.log(req.query.birth);

	var birthday = moment(req.query.birth).format('L');
	var location = req.query.location;
	var about = req.query.about;

	console.log("update query");
	console.log(birthday);


	User.findOneAndUpdate({ fbUserID : id}, {$set : {email: email , birthday: birthday ,location: location}}, function (err, model) {
    	console.log(model);
    	res.status(200).send();
	});
}

module.exports.addEvent = function(req,res){
	var id = req.params.id;

	console.log(req.query._event);

	User.findOneAndUpdate({ fbUserID : id}, {$addToSet : {regiteredEvents: {_event : req.query._event}}}, function (err, model) {
    	console.log(model);
    	res.status(200).send();
	});
}

module.exports.checkExist = function(req,res){
	var id = req.params.id;
	User.findOne({fbUserID : id}, function (err, model) {
    	console.log(model);
    	//res.status(200).send();
    	res.json(model);
	});
}
