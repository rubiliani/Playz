var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
    eventTitle : { type : String, default:''},
    creator:{ type : Schema.Types.ObjectId, ref: 'users'},
    whenDate : { type : String, default:''}
});


Notification = mongoose.model('notifications', notificationSchema);