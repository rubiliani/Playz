
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
	groupSize: { type : Number, default:2},
	ageRange:{
		min: {type : Number, default:20},
		max: {type : Number, default:40}
	},
	gender: { type : String, default:''},
	payedFacility: { type : String, default:''},
	location: {
		name: { type : String, default:''},
		latitude: { type : Number, default:0},
		longitude: { type : Number, default:0}
	},
	radius: { type : Number, default:5},
	creator:{ type : Schema.Types.ObjectId, ref: 'users'},
 	registeredUsers:[{ type : Schema.Types.ObjectId, ref: 'users'}]
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

eventSchema.statics.create_event=function(event,callback){
	var r = {msg:[],status:0};
	/*var query = {
		id:event._id
	};*/

	console.log("in model "+event);
	
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
	console.log(user._id)
	var id = mongoose.Types.ObjectId(user._id);
	var query = {
<<<<<<< HEAD
		"registeredUsers":{ $ne : id}
=======
		whenDate:{$gt:new Date()}
>>>>>>> a299a11a28b56cf97be7de6a3b14d8c09bb378bb
	};

	
	this.model('events').find(query)
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

Event = mongoose.model('events', eventSchema);

