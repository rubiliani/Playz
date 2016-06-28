
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var eventSchema = new Schema({
	//id : { type : String ,  index : true, unique : true , required :true},
	eventTitle : { type : String, default:''},
	createdDate : { type : Date, default:Date.now},
	privacyType: { type : String, default:''},
	sportType : {type : String, default:''},
	level : {type : String, default:''},
	mindset: { type : String, default:''},
	whenDate : { type : Date, default:Date.now},
	when: { type : String, default:''},
	groupSize: { type : Number, default:2},
	ageRange:{
		min: {type : Number, default:20},
		max: {type : Number, default:40}
	},
	gender: { type : String, default:''},
	payedFacility: { type : String, default:''},
	location: {
		city: { type : String, default:''},
		name: { type : String, default:''},
		latitude: { type : Number, default:0},
		longitude: { type : Number, default:0}
	},
	radius: { type : Number, default:5},
	creator:{ type : Schema.Types.ObjectId, ref: 'users'},
 	registeredUsers:[{ type : Schema.Types.ObjectId, ref: 'users'}],
 	messages:[{ type : Schema.Types.ObjectId, ref: 'messages'}]
});

eventSchema.statics.update_event=function(event,callback){
	var r = {msg:[],status:0};
	var query = {
		_id:event._id
	};

	var options={
		upsert:false,
		new: false
	}
	
	this.model('events').findOneAndUpdate(query,{$set:event},options)
		.exec(function(err,result){
			if (err){
				r.msg.push(err);
				return callback(r);
			}

			r.msg.push("event found");
			r.status=1;
			r.event=result;
			return callback(r);
		});
}

eventSchema.statics.joinToEvent=function(eid,uid,callback){
	var r = {msg:[],status:0};
	eid = mongoose.Types.ObjectId(eid);
	var query = {
		_id:eid
	};

	var options={
		upsert:true,
		new: false
	}
	this.model('events').update(query,{$addToSet:{registeredUsers:uid}},options)
		.exec(function(err,result){
			if (err){
				r.msg.push(err);
				return callback(r);
			}

			r.msg.push("event found");
			r.status=1;
			r.event=result;
			return callback(r);
		});
}

eventSchema.statics.leaveFromEvent=function(eid,uid,callback){
	var r = {msg:[],status:0};
	eid = mongoose.Types.ObjectId(eid);
	var query = {
		_id:eid
	};

	var options={
		upsert:false,
		new: false
	}
	this.model('events').findOneAndUpdate(query,{$pull:{registeredUsers:uid}},options)
		.exec(function(err,result){
			if (err){
				r.msg.push(err);
				return callback(r);
			}

			r.msg.push("event found");
			r.status=1;
			r.event=result;
			return callback(r);
		});
}

eventSchema.statics.create_event=function(event,callback){
	var r = {msg:[],status:0};
	/*var query = {
		id:event._id
	};*/

	
	
	this.model('events').save()
		.exec(function(err,result){
			if (err){
				r.msg.push(err);
				return callback(r);
			}

			r.msg.push("event found");
			r.status=1;
			r.event=result;
			return callback(r);
		});
}

eventSchema.statics.getAllEvents=function(user,filter,callback){
	var r = {msg:[],status:0};
	//console.log("get all events for "+user._id)
	var id = mongoose.Types.ObjectId(user._id);
	var date= new Date().setHours(0,0,0,0);
	// var date= new Date();
	// date.setDate(date.getDate()-1);
	// date = date.setHours(0,0,0,0);
	
	var uGender = user.gender;
	if(uGender==="male")
		uGender="Male";
	else
		uGender="Female";

	//console.log("gender",uGender)

	var query = {
		privacyType:"public",
		gender:{$in:["Co-ed",uGender]},
		registeredUsers:{ $ne : id},
		//groupSize: {"books" : {$size : {$gt : 1}}},
		whenDate:{$gte:date}
	};

	
	this.model('events').find(query).populate('registeredUsers').sort('whenDate')
		.exec(function(err,result){
			if (err){
				r.msg.push("getAllEvents",err);
				return callback(r);
			}

			r.msg.push("getAllEvents found");
			r.status=1;
			r.events=result;
			return callback(r);
		});
}

eventSchema.statics.getAdminEvents=function(user,filter,callback){
	var r = {msg:[],status:0};
	console.log("get all events for "+user._id)
	var id = mongoose.Types.ObjectId(user._id);
	var date= new Date().setHours(0,0,0,0);
	// var date= new Date();
	// date.setDate(date.getDate()-1);
	// date = date.setHours(0,0,0,0);

	var query = {
		//groupSize: {"books" : {$size : {$gt : 1}}},
		whenDate:{$gte:date}
	};

	
	this.model('events').find(query).populate('registeredUsers').sort('whenDate')
		.exec(function(err,result){
			if (err){
				r.msg.push("getAdmin Events",err);
				return callback(r);
			}

			r.msg.push("getAdminEvents found");
			r.status=1;
			r.events=result;
			return callback(r);
		});
}




eventSchema.statics.getMyEvents=function(user,filter,callback){
	var r = {msg:[],status:0};
	
	var id = mongoose.Types.ObjectId(user._id);
	var query = {
		"registeredUsers": id
	};

	
	this.model('events').find(query).populate('registeredUsers')
		.exec(function(err,result){
			if (err){
				r.msg.push("get My Events",err);
				return callback(r);
			}

			r.msg.push("get My Events found");
			r.status=1;
			r.events=result;
			return callback(r);
		});
}

eventSchema.statics.getMessages=function(eventid,callback){
	
	var r = {msg:[],status:0};
	
	var id = mongoose.Types.ObjectId(eventid);
	console.log("event "+id);
	var query = {
		_id: id
	};

	this.model('events').find(query).select('messages')
		.exec(function(err,result){
			if (err){
				r.msg.push("get messages",err);
				return callback(r);
			}
			console.log(result);
			r.msg.push("get messages");
			r.status=1;
			r.messages=result;
			return callback(r);
		});
}

eventSchema.statics.addChatMessage=function(msgid,eventid,callback){
	var r = {msg:[],status:0};
	
	var id = mongoose.Types.ObjectId(eventid);
	var query = {
		_id:id
	};

	
	this.model('events').findOneAndUpdate(query,{$push:{messages:msgid}})
		.exec(function(err,result){
			if (err){
				r.msg.push("addChatMessage",err);
				return callback(r);
			}

			r.msg.push("addChatMessage success");
			r.usersEvent=result.registeredUsers;
			r.status=1;
			return callback(r);
		});
}


Event = mongoose.model('events', eventSchema);

