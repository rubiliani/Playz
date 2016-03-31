
var Event = require ('../models/event')

module.exports.create = function(req,res){
	console.log(req.body);

	var evt = new Event(req.body);
	evt.save(function(err,result){
		res.json(result);
	});
}

module.exports.getList = function(req,res){
	var id = req.params.id;
	Event.find({fbUserId : id}, function(err,results){
		res.json(results);
	})
}

