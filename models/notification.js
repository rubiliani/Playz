
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
    event:{type : Schema.Types.ObjectId ,  ref: 'events'},
    creator:{ type : Schema.Types.ObjectId, ref: 'users'},
    action : { type : String, default:'create'},

});

//notificationSchema.statics.create_notification=function(event,fbId,callback){
//	var r = {msg:[],status:0};
//	/*var query = {
//		id:event._id
//	};*/
//
//	console.log("in noti model"+event+" "+fbId);
//
//	this.model('notifications').save()
//		.exec(function(err,result){
//			if (err){
//				r.msg.push(err);
//				return callback(r);
//			}
//
//			r.msg.push("noti pushed");
//			r.status=1;
//			r.notification=result;
//			return callback(r);
//		});
//}


Notification = mongoose.model('notifications', notificationSchema);