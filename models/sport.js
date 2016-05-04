var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sportSchema = new mongoose.Schema({ 
	name: String
});

Sport = mongoose.model('sports', sportSchema);