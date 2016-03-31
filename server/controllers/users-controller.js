
var User = require ('../models/user')

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

module.exports.update = function(req,res){
	var id = req.params.id;
	var cvrPic = req.query.coverPic;

	console.log(req.query.coverPic);

	User.findOneAndUpdate({ fbUserID : id}, {$set : {coverPic: cvrPic}}, function (err, model) {
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
