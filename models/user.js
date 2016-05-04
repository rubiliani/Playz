var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({ 
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

User = mongoose.model('users', userSchema);