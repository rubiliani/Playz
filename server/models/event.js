
var mongoose = require('mongoose');


var schema = new mongoose.Schema({ fbUserId: 'string', sport:'string'
		, level:'string', mindset:'string' , position:{lat:'string',long:'string'}, radius:'string', when:'string'
		, ageRangeMin:'string', ageRangeMax:'string', genderSelection:'string',payedSelection:'string',regiteredUsers:[{ fbUserId: String, picLink: String }]});
module.exports = mongoose.model('Event',schema);