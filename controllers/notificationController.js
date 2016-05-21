var moment = require('moment')
/**
 * receive user and update or create in the db
 * @param req
 * @param res
 */
exports.createNotification = function(req,res,next){
	var r = {msg:[],status:0};
	var event = req.body.event;
	var user = req.body.fbId;

	/*
	if (!user || typeof(user) !== 'object' || !user.id){
		r.msg.push('user not exist or user id not found',user);
		return res.json(r);
	}*/

	Notification.create_notification(user,event,function(result){
		if (!result.status){
			res.status(404).send("create notif");
		}
		
		return res.json(result)
	});
}


exports.deleteNotification = function(req,res,next){
	var r = {msg:[],status:0};
	var user = req.body.user;
	var notification = req.body.notification;

	console.log("delte not data",user,notification);

	/*
	if (!user || typeof(user) !== 'object' || !user.id){
		r.msg.push('user not exist or user id not found',user);
		return res.json(r);
	}*/

	User.delete_invite_notification(notification,user,function(result){
		if (!result.status){
			res.status(404).send("delete notif");
		}
		
		return res.json(result)
	});

}

exports.getNotifications = function(req,res,next){
	User.populate(req.user.notifications,{
			path: 'notification',
			model: 'notifications',
			populate: [{
				path: 'event'
				, model: 'events'
				, select: 'id sportType whenDate location'
			},{
				path: 'creator'
				,model: 'users'
				,select:'id name picture'
			}],

	},function (err, projects) {
		//console.log(err||projects)
		if (err){
			return res.status(404).json(err)
		}
		return res.json(projects);
	})

}


