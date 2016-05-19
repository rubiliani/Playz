
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
    event:{type : Schema.Types.ObjectId ,  ref: 'events'},
    creator:{ type : Schema.Types.ObjectId, ref: 'users'},
    action : { type : String, default:'create'},

});


Notification = mongoose.model('notifications', notificationSchema);