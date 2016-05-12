var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sportSchema = new Schema({
	name: String
});

Sport = mongoose.model('sports', sportSchema);