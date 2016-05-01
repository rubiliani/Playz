
var mongoose = require('mongoose');


var schema = new mongoose.Schema({ 
	fbUserID:'string',
	_user: { type: 'string', ref: 'User' },
	createdDate :'string',
	privacy:'string',
	sport:'string', 
	level:'string', 
	mindset:'string',
	groupSize:'string', 
	position:{lat:'string',long:'string'}, 
	radius:'string', 
	when:'string',
	whenDate:'string',
	ageRangeMin:'string', 
	ageRangeMax:'string', 
	genderSelection:'string',
	payedSelection:'string',
	regiteredUsers:[{ _user:{ type: 'string', ref: 'User' }, picLink: String }]});
module.exports = mongoose.model('Event',schema);