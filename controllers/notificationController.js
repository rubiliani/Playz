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

exports.getNotifications = function(req,res,next){
	User.populate(req.user.notifications,{
			path: 'notification',
			model: 'notifications'
			//	path: 'notification.event',
			//	model: 'events'
			//	path: 'notification.creator',
			//	model: 'users'

	}
	,function (err, projects) {
		console.log(projects)
		res.json(projects);
	})

	//User.populate(req.user,{
	//	path: 'notifications',
	//	populate: {
	//		path: 'notifications.notification'
	//		,model: 'notifications'
	//	}
	//	 ,populate: {
	//		path: 'notification.creator'
	//		,model: 'users'
	//	}
	//},function(err, docs) {
	//	console.log(docs.notifications)
	//	res.json(docs.notifications)
	//});
}

