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

