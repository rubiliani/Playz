
var mongoose = require('mongoose');


var schema = new mongoose.Schema({ firstname: 'string', lastname: 'string' , fbUserID:'string' ,
 email:'string', location:'string', birthday:'string',profilePic:'string', coverPic:'string'});
module.exports = mongoose.model('User',schema);
