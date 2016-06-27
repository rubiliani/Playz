var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	id : { type : String ,  index : true, unique : true , required :true},
	email : { type : String, default:''},
	gender: { type : String, default:''},
	birthday : {type : Date, default:''},
	age_range: {
		min: {type : Number, default:0},
	},
	cover:{
		source:{type : String, default:''},
		id:{type : Number, default:0}
	},
	name : { type : String, default:''},
	first_name: { type : String, default:''},
	last_name: { type : String, default:''},
	picture:{
		data:{
			url:{ type : String, default:''}
		}
	},
	hometown:{
		name: { type : String, default:''},
		latitude: { type : Number, default:0},
		longitude: { type : Number, default:0},
		data: { type: Schema.Types.Mixed, default:{}}
	},
	location: {
		name: { type : String, default:''},
		latitude: { type : Number, default:0},
		longitude: { type : Number, default:0}
	},
	userEvents:[{type : Schema.Types.ObjectId , ref: 'events'}],
 	registeredEvents:[{type : Schema.Types.ObjectId ,  ref: 'events'}],
 	notifications:[{
		notification:{type : Schema.Types.ObjectId ,  ref: 'notifications'},
		read: { type : Boolean, default:false}
	}],

	devices:[{
		_id:{type : String, unique : true,index : true }
	}],
	about:{type : String, default:''}
});

userSchema.statics.update_user=function(user,callback){
	var r = {msg:[],status:0};
	var query = {
		id:user.id
	};
	var options={
		upsert:true,
		new: true
	}
	this.model('users').findOneAndUpdate(query,{$set:user},options)
		.exec(function(err,result){
			if (err){
				r.msg.push(err);
				return callback(r);
			}

			r.msg.push("user found");
			r.status=1;
			r.user=result;
			return callback(r);
		});
}

userSchema.statics.get_user_ids=function(regiteredUsers,callbackSuccess,callbackError){
	var r = {msg:[],status:0};
	var query = {
		id:{$in:regiteredUsers}
	};

	this.model('users').find(query).select('_id')
		.exec(function(err,result){
			if (err){
				r.msg.push(err);
				return callbackError(r);
			}

			r.msg.push("users found",result);
			r.users=result;
			r.status=1;

			return callbackSuccess(r);
		});
}
userSchema.statics.get_user_devices=function(regiteredUsers,callbackSuccess,callbackError){
	var r = {msg:[],status:0};
	var query = {
		id:{$in:regiteredUsers}
	};

	this.model('users').find(query).select('devices')
		.exec(function(err,result){
			if (err){
				r.msg.push(err);
				return callbackError(r);
			}

			r.msg.push("users found",result);
			r.users=result;
			r.status=1;

			return callbackSuccess(r);
		});
}

userSchema.statics.get_user=function(userid,callback){
	var r = {msg:[],status:0};
	var query = {
		id:userid
	};

	this.model('users').findOne(query)
		.exec(function(err,result){
			if (err){
				r.msg.push(err);
				return callback(r);
			}

			if (!result){
				r.msg.push("user was not found");
			}
			else{
				r.msg.push("user found");
				r.user=result;
				r.status=1;
			}

			return callback(r);
		});
}

//remove invite notification
userSchema.statics.delete_invite_notification=function(notificationid,userid,callback){
	var r = {msg:[],status:0};
	//console.log("notificationid to delete ",notificationid,userid)
	var query = {
		_id : userid
	};

	this.model('users').update(query, {
			$pull: {
					notifications: {notification : notificationid}
			}
	}).exec(function(err,result){
			if (err){
				r.msg.push("delete notification",err);
				return callback(r);
			}

			r.msg.push("delete notification");
			r.status=1;

			return callback(r);
		});
}

//remove invite notification
userSchema.statics.delete_user_from_event=function(eventid,userid,callback){
	var r = {msg:[],status:0};
	//console.log("delete user from event",eventid,userid)
	var query = {
		_id : userid
	};

	this.model('users').update(query, {
			$pull: {
					registeredEvents : eventid
			}
	}).exec(function(err,result){
			if (err){
				r.msg.push("delete user",err);
				return callback(r);
			}

			r.msg.push("delete user");
			r.status=1;

			return callback(r);
		});
}


userSchema.statics.invite_users_to_event=function(data,callbackSuccess,callbackError){
	var r = {msg:[],status:0};
	var query = {
		_id:{$in:data.invitedUsers}
	};

	this.model('users').update(query, {
			$addToSet: {
					notifications: {notification: data.notificationid}, read: false
			}
	}).exec(function(err,result){
			if (err){
				r.msg.push("register_users_to_event",err);
				return callbackError(r);
			}

			r.msg.push("register_users_to_event");
			r.status=1;

			return callbackSuccess(r);
		});
}

userSchema.statics.addDeviceToUser=function(userid,regid,callback){
	var r = {msg:[],status:0};
	var query = {
		_id:userid
	};

	this.model('users').update(query, {
			$addToSet: {
					devices: {_id: regid}
			}
	}).exec(function(err,result){
			if (err){
				r.msg.push("add device to user",err);
				return callback(r);
			}

			r.msg.push("add device to user success");
			r.status=1;

			return callback(r);
		});
}

User = mongoose.model('users', userSchema);