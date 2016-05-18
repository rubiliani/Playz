
var async = require("async");




module.exports.create = function(req,res){
    var event = req.body.event;
    if (!event){
        return res.status(404).json({status:0,msg:['no event']})
    }

    User.get_user_ids(event.invitedUsers,function(result){
        // event.registeredUsers=result.users.map(function(val){return val._id});
        var invitedUsers = result.users.map(function(val){return val._id});
        var evt = new Event(event);
        evt.save(function(err){
            if (err){
                return res.status(404).json({status:0,msg:['failed to save event',err]})
            }

            req.user.userEvents.push(evt._id);
            req.user.save();

            invite_users_to_event(evt,invitedUsers,"create");

            return res.json({event:evt,msg:['create event success'],status:1});

        });
    },function(err){
        return res.status(404).json({msg:['create event success'],status:0})
    })


}

module.exports.update = function(req,res){
	var event = req.body.event;
	if (!event){
		return res.status(404).json({status:0,msg:['no event received']})
	}

    Event.update_event(event,function(result){
		if (!result.status){
			return res.status(404).json(result);
		}

		return res.json(result);
	})

}

function invite_users_to_event(event,invitedUsers,action){
    var notification = new Notification({
        event: event._id,
        creator: event.creator,
        action:action
    })
    notification.save(function(err){
        if (err){
            console.log("failed to register_users_to_event",err)
            return;
        }
        var data={
            notificationid:notification._id,
            eventid:event._id,
            invitedUsers:invitedUsers
        }

        User.invite_users_to_event(data,function(result){
            console.log(result);
			//TODO populate notification
			socket.newEventReceived(invitedUsers,notification)

        },
        function(err){
            console.log(err)
        });
    },function(err){
        console.log("failed to register_users_to_event",err)
    })

}



exports.createEvent = function(req,res,next){
	var r = {msg:[],status:0};
	//var event = req.body.event;
	var evt = req.body.event;
	console.log("in create event: "+evt);

	Event.create_event(evt,function(err,result){
		res.json(result);
	});

/*
	if (!event || typeof(event) !== 'object' || !user.id){
		r.msg.push('user not exist or user id not found',user);
		return res.json(r);
	}
*//*
	Event.create_event(event,function(result){
		//if (result.status==1 && (!result.user.birthday || !result.user.hometown.name)){
		//	result.newUser=true;
		//}
		return res.json(result)
	});*/
}


module.exports.getList = function(req,res){
	var id = req.params.id;
	var populateQuery = [{path:'_user'}, {path:'regiteredUsers._user'}];
	console.log(id);
	
	Event.find({id : id}, function(err,results){
		res.json(results);
	}).populate(populateQuery)
			.exec(function (err, event) {
  				if (err) return handleError(err);
			});
}



exports.getOtherList = function(req,res){
	var id = req.params.id;

	var populateQuery = [{path:'user'}, {path:'registeredUsers.user'}];
	console.log(id);

	Event.find({id:{ $ne : id}}, function(err,results){
			res.json(results);
		}).populate(populateQuery)
			.exec(function (err, event) {
  				if (err) return handleError(err);
			});



}

exports.getAllEvents = function(req,res){
	var filter = req.body;
	Event.getAllEvents(req.user,filter,function(result){
		if (!result.status){
			return res.status(404).json(result)
		}
		return res.json(result)
	})

}

module.exports.getTodayOtherList = function(req,res){
	var id = req.params.id;

	var populateQuery = [{path:'_user'}, {path:'regiteredUsers._user'}];
	console.log(id);

	Event
		.find({$and:[{fbUserID:{ $ne : id}},{when:"Today"}]}, function(err,results){
			res.json(results);
		}).populate(populateQuery)
			.exec(function (err, event) {
  				if (err) return handleError(err);
			});



}
module.exports.getTomorrowOtherList = function(req,res){
	var id = req.params.id;

	var populateQuery = [{path:'_user'}, {path:'regiteredUsers._user'}];
	console.log(id);

	Event
		.find({$and:[{fbUserID:{ $ne : id}},{when:"Tomorrow"}]}, function(err,results){
			res.json(results);
		}).populate(populateQuery)
			.exec(function (err, event) {
  				if (err) return handleError(err);
			});



}
module.exports.getNegotOtherList = function(req,res){
	var id = req.params.id;

	var populateQuery = [{path:'_user'}, {path:'regiteredUsers._user'}];
	console.log(id);

	Event
		.find({$and:[{fbUserID:{ $ne : id}},{when:"Negotiable"}]}, function(err,results){
			res.json(results);
		}).populate(populateQuery)
			.exec(function (err, event) {
  				if (err) return handleError(err);
			});



}

module.exports.addUser = function(req,res){
	var id = req.params.id;
	console.log("evt id "+id);
	console.log("link user to evt: "+ req.query._user);

	Event.findOneAndUpdate({ _id : id}, {$addToSet : {regiteredUsers: {_user : req.query._user}}}, function (err, model) {
    	console.log(model);
    	res.status(200).send();
	});
}








exports.getUpcomingEvents = function(req,res){
	res.json({"getUpcomingEvents":"NOT READY"})
}
exports.getPastEvents = function(req,res){
	res.json({"getPastEvents":"NOT READY"})
}
exports.getEventById = function(req,res){
	var eid=req.body.eventid;
	if (!eid){
		return res.status(404).json({"getEventById":"NOT READY"})
	}
	res.json({"getEventById":"NOT READY"})
}







