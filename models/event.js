
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	//id : { type : String ,  index : true, unique : true , required :true},
	eventTitle : { type : String, default:''},
	createdDate : { type : Date, default:''},
	privacyType: { type : String, default:''},
	sportType : {type : String, default:''},
	level : {type : String, default:''},
	mindset: { type : String, default:''},
	whenDate : { type : Date, default:''},
	groupSize: { type : Number, default:'2'},
	ageRange:{
		min:{ type : Number, default:'20'},
		max: {type : Number, default:'40'}
	},
	gender: { type : String, default:''},
	payedFacility: { type : String, default:''},
	location: {
		name: { type : String, default:''},
		latitude: { type : Number, default:0},
		longitude: { type : Number, default:0}
	},
	radius: { type : Number, default:'5'},
	
 	registeredUsers:[{
		event:{ type : String, default:'', ref: 'users'},
		default:[]
	}]
});

eventSchema.statics.update_event=function(user,callback){
	var r = {msg:[],status:0};
	var query = {
		id:event._id
	};
	var options={
		upsert:true,
		new: true
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

Event = mongoose.model('events', eventSchema);