var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	id : { type : String ,  index : true, unique : true , required :true},
	email : { type : String, default:''},
	gender: { type : String, default:''},
	birthday : {type : Date, default:''},
	"age_range": {
		"min": {type : Number, default:0},
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

User = mongoose.model('users', userSchema);