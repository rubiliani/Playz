
var Sport = require ('../models/sport')

module.exports.create = function(req,res){
	console.log(req.body);

	var sprt = new Sport(req.body);
	sprt.save(function(err,result){
		res.json(result);
	});
}

module.exports.getList = function(req,res){
	Sport.find({}, function(err,results){
		res.json(results);
	})
}