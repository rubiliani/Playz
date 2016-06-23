var async = require("async");
var mongoose = require('mongoose');

module.exports.create = function (req, res) {
    var event = req.body.event;
    if (!event) {
        return res.status(404).json({status: 0, msg: ['no event']})
    }

    User.get_user_ids(event.invitedUsers, function (result) {
        var invitedUsers = result.users.map(function (val) {
            return val._id
        });
        //invitedUsers.push(req.user._id)
        var evt = new Event(event);
        evt.save(function (err) {
            if (err) {
                return res.status(404).json({status: 0, msg: ['failed to save event', err]})
            }

            req.user.userEvents.push(evt._id);
            req.user.registeredEvents.push(evt._id);
            req.user.save();

            invite_users_to_event(evt, invitedUsers, "create");

            return res.json({event: evt, msg: ['create event success'], status: 1});

        });
    }, function (err) {
        return res.status(404).json({msg: ['create event failed'], status: 0})
    })


}

module.exports.inviteToEvent = function (req, res) {
    var evt = req.body.event;
    var users = req.body.users;
    if (!evt) {
        return res.status(404).json({status: 0, msg: ['no event']})
    }

    console.log("got users ",users);
    User.get_user_ids(users, function (result) {
        var invitedUsers = result.users.map(function (val) {
            return val._id
        });
        console.log("invitedUsers",invitedUsers);
        invite_users_to_event(evt, invitedUsers, "invite");
        return res.json({event: evt, msg: ['invite event success'], status: 1});

        
    }, function (err) {
        return res.status(404).json({msg: ['invite event failed'], status: 0})
    })


}



module.exports.update = function (req, res) {
    var event = req.body.event;
    console.log("got event to update",event);
    if (!event) {
        return res.status(404).json({status: 0, msg: ['no event received']})
    }

    Event.update_event(event, function (result) {
        if (!result.status) {
            return res.status(404).json(result);
        }

        return res.json(result);
    })

}

function invite_users_to_event(event, invitedUsers, action) {
    var notification = new Notification({
        event: event._id,
        creator: event.creator,
        action: action
    })
    notification.save(function (err) {
        if (err) {
            console.log("failed to register_users_to_event", err)
            return;
        }
        var users_to_invite = {
            notificationid: notification._id,
            eventid: event._id,
            invitedUsers: invitedUsers
        }

        User.invite_users_to_event(users_to_invite, function (result) {
                console.log(result, notification);
                Notification.findOne({_id: notification._id})
                    .populate('event', '-messages').populate('creator', 'id _id name picture')
                    .exec(function (err, result) {
                        if (!err)
                            socket.newEventReceived(invitedUsers, result)

                    })
            },
            function (err) {
                console.log(err)
            });
    })
}

module.exports.createMessage = function (req, res) {
    var data = req.body;
    console.log("event id " + data.event);
    var msg = new Message({
        event:data.event,
        sender: data.user,
        text: data.message
    })

    msg.save(function (err) {
        if (err) {
            console.log("failed to add message", err)
            return res.status(404).json({createMessage: "failed to save msg", err: err})
        }


        Event.addChatMessage(msg._id, data.event, function (result) {
            console.log('addChatMessage',result);
            Message.populate(msg, [{
                path: 'sender',
                model: 'users',
                select:'id _id name picture'

            },
            {
                path: 'event',
                model: 'events',
                select:'_id eventTitle sportType'
            }
            ], function (err, populatemsg) {
                //console.log(err||populatemsg)
                if (!err) {
                    socket.newMessageReceived(result.usersEvent,populatemsg);
                }

            })

            if (!result.status) {
                return res.status(404).json({createMessage: "failed to save msg"})
            }
            return res.json(result)
        })

    });
}


exports.createEvent = function (req, res, next) {
    var r = {msg: [], status: 0};
    //var event = req.body.event;
    var evt = req.body.event;
    console.log("in create event: " + evt);

    Event.create_event(evt, function (err, result) {
        res.json(result);
    });

    /*
     if (!event || typeof(event) !== 'object' || !user.id){
     r.msg.push('user not exist or user id not found',user);
     return res.json(r);
     }
     */
    /*
     Event.create_event(event,function(result){
     //if (result.status==1 && (!result.user.birthday || !result.user.hometown.name)){
     //	result.newUser=true;
     //}
     return res.json(result)
     });*/
}

/*
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
 }*/

/*

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



 }*/

exports.getAllEvents = function (req, res) {
    var filter = req.body;
    console.log(req)
    Event.getAllEvents(req.user, filter, function (result) {
        if (!result.status) {
            return res.status(404).json(result)
        }
        return res.json(result)
    })

}

exports.getAdminEvents = function (req, res) {
    var filter = req.body;
    console.log(req)
    Event.getAdminEvents(req.user, filter, function (result) {
        if (!result.status) {
            return res.status(404).json(result)
        }
        return res.json(result)
    })

}


exports.getMyEvents = function (req, res) {
    var filter = req.body;
    Event.getMyEvents(req.user, filter, function (result) {
        if (!result.status) {
            return res.status(404).json(result)
        }
        return res.json(result)
    })

}

exports.joinEvent = function (req, res) {
    var eid = req.body.eventid;
    console.log("in join",eid,req.user._id);
    Event.joinToEvent(eid,req.user._id,function(result){
        if (!result.status){
            return res.status(404).json(result)
        }

        
        //TODO send ws to all registered users for a new user in the team
        req.user.registeredEvents.push(eid);
        req.user.save();
        return res.json(result);
    })

}

exports.leaveEvent = function (req, res) {
    var eid = req.body.eventid;
    var uid = req.body.userid;

    Event.leaveFromEvent(eid,req.user._id,function(result){
        if (!result.status){
            return res.status(404).json(result)
        }

        //TODO send ws to all registered users for a new user in the team
        var index = req.user.registeredEvents.indexOf(result.event._id);
        if (index != -1){
            req.user.registeredEvents.splice(index,1);
        }
        req.user.save();

        return res.json(result);
    })

}

exports.removeUserFromEvent = function (req, res) {
    var eid = req.body.eventid;
    var uid = req.body.userid;

    Event.leaveFromEvent(eid,uid,function(result){
        if (!result.status){
            return res.status(404).json(result)
        }

        //TODO send ws to all registered users for a new user in the team
        var index = req.user.registeredEvents.indexOf(result.event._id);
        if (index != -1){
            req.user.registeredEvents.splice(index,1);
        }
        req.user.save();

        return res.json(result);
    })

}

exports.getMessages = function (req, res) {
    //var filter = req.body;
    //console.log(req.body)
    var ev = req.body.event;
    console.log("event " + ev);
    Event.getMessages(ev, function (result) {
        if (!result.status) {
            return res.status(404).json(result)
        }
        Event.populate(result.messages, {
            path: 'messages',
            model: 'messages',
            populate: {
                path: 'sender'
                , model: 'users'
                , select: 'id name picture'
            }

        }, function (err, projects) {
            //console.log(err||projects)
            if (err) {
                return res.status(404).json(result)
            }
            return res.json(projects[0]);
        })
    })

}


module.exports.getTodayOtherList = function (req, res) {
    var id = req.params.id;

    var populateQuery = [{path: '_user'}, {path: 'regiteredUsers._user'}];
    console.log(id);

    Event
        .find({$and: [{fbUserID: {$ne: id}}, {when: "Today"}]}, function (err, results) {
            res.json(results);
        }).populate(populateQuery)
        .exec(function (err, event) {
            if (err) return handleError(err);
        });
}
module.exports.getTomorrowOtherList = function (req, res) {
    var id = req.params.id;

    var populateQuery = [{path: '_user'}, {path: 'regiteredUsers._user'}];
    console.log(id);

    Event
        .find({$and: [{fbUserID: {$ne: id}}, {when: "Tomorrow"}]}, function (err, results) {
            res.json(results);
        }).populate(populateQuery)
        .exec(function (err, event) {
            if (err) return handleError(err);
        });


}
module.exports.getNegotOtherList = function (req, res) {
    var id = req.params.id;

    var populateQuery = [{path: '_user'}, {path: 'regiteredUsers._user'}];
    console.log(id);

    Event
        .find({$and: [{fbUserID: {$ne: id}}, {when: "Negotiable"}]}, function (err, results) {
            res.json(results);
        }).populate(populateQuery)
        .exec(function (err, event) {
            if (err) return handleError(err);
        });
}

module.exports.addUser = function (req, res) {
    var id = req.params.id;
    console.log("evt id " + id);
    console.log("link user to evt: " + req.query._user);

    Event.findOneAndUpdate({_id: id}, {$addToSet: {regiteredUsers: {_user: req.query._user}}}, function (err, model) {
        console.log(model);
        res.status(200).send();
    });
}


exports.getUpcomingEvents = function (req, res) {

    console.log("upcomingEvents ",req.user)
    populateEvents(req.user, function (user) {
        var millis = new Date().setHours(0, 0, 0, 0);

        
        var upcomingEvents = user.registeredEvents.filter(function (val) {
            console.log("upcomingEvents val ",val.whenDate);
            var emillis = new Date(val.whenDate);
            if (emillis >= millis) {
                return val;
            }
        })
        return res.json(upcomingEvents)
    })
}
exports.getPastEvents = function (req, res) {
    populateEvents(req.user, function (user) {
        var millis = new Date().setHours(0, 0, 0, 0);

        var upcomingEvents = user.registeredEvents.filter(function (val) {
            console.log("pastEvents val ",val.whenDate);
            var emillis = new Date(val.whenDate).setHours(0, 0, 0, 0);
            if (emillis < millis) {
                return val;
            }
        })
        return res.json(upcomingEvents)
    })

}
exports.getEventById = function (req, res) {
    var eid = req.body.eventid;
    if (!eid) {
        return res.status(404).json({"getEventById": "event id not found"})
    }
    var index = req.user.registeredEvents.indexOf(eid)
    if (index != -1) {
        var event = req.user.registeredEvents[index];
        populateEvents({registeredEvents: [event]}, function (user) {
            var millis = new Date().setHours(0, 0, 0, 0);
            return res.json(user.registeredEvents[0])
        })
    } else {
        return res.status(404).json({"getEventById": "user not allow to see this. he is not register to the event"})
    }
}

function populateEvents(user, callback) {
    User.populate(user, {
        path: 'registeredEvents',
        model: 'events',
        options:{sort: { 'whenDate': 1 } },
        populate: [{
            path: 'registeredUsers'
            , model: 'users'
            , select: 'id name picture',
        }, {
            path: 'creator'
            , model: 'users'
            , select: 'id name picture'
        }],

    }, function (err, populateevents) {
        //console.log(err||populateevents)
        if (err) {
            callback([]);
        }
        callback(populateevents);
    })
}





