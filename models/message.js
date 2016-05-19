
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
   // event:{type : Schema.Types.ObjectId ,  ref: 'events'},
    sender:{ type : Schema.Types.ObjectId, ref: 'users'},
    text : { type : String, default:''},
    timestamp:{type: Date, default:Date.now}

});


Message = mongoose.model('messages', messageSchema);