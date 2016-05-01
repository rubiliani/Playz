
var mongoose = require('mongoose');


var schema = new mongoose.Schema({ 
	firstname: 'string', 
	lastname: 'string' , 
	fbUserID:'string' ,
 	email:'string', 
 	location:'string', 
 	birthday:'string',
 	profilePic:'string', 
 	coverPic:'string',
 	regiteredEvents:[{ _event:{ type: 'string', ref: 'Event' }}]
 });
module.exports = mongoose.model('User',schema);
