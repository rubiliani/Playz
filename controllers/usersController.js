var moment = require('moment')
/**
 * receive user and update or create in the db
 * @param req
 * @param res
 */
exports.update_user = function(req,res,next){
	var r = {msg:[],status:0};
	var user = req.body.user;

	if (!user || typeof(user) !== 'object' || !user.id){
		r.msg.push('user not exist or user id not found',user);
		return res.json(r);
	}

	User.update_user(user,function(result){
		if (!result.status){
			res.status(404).send("update user failed");
		}
		if (!result.user.birthday || !result.user.hometown.name){
			result.newUser=true;
		}
		socket.onUserConnected(result.user);
		return res.json(result)
	});
}



exports.delete_user_from_event = function(req,res,next){
	var r = {msg:[],status:0};
	var user = req.body.userid;
	var event = req.body.eventid;
	console.log("admin kick");
	console.log("user id", user);
	console.log("event id",event);

	User.delete_user_from_event(event,user,function(result){
		if (!result.status){
			res.status(404).send("delete user failed");
		}
		return res.json(result)
	});
}

exports.add_device_to_user = function(req,res,next){
	var r = {msg:[],status:0};
	var userid = req.body.userid;
	var regid = req.body.regid;
	
	console.log("user id", userid);
	console.log("reg id",regid);

	User.addDeviceToUser(userid,regid,function(result){
		if (!result.status){
			res.status(404).send("delete user failed");
		}
		return res.json(result)
	});
}

exports.get_user_devices = function(req,res,next){
	var userDevices = [];
	var r = {msg:[],status:0};
	var userids = req.body.userids;
	
	console.log("user ids", userids);

	User.get_user_devices(userids,function(result){
		if (!result.status){
			res.status(404).send("failed to get devices");
		}

		/*
		console.log("user devices", result);

		result.forEach(function (user, i){
			user.devices.forEach(function(id,i){
				userDevices.push(id);
			})
		});

		console.log("all users devices", userDevices);

		var message = { 
  			app_id: "84591d87-0267-4172-a9f1-f5a34048f4b3",
  			contents: {"en": "You invited to event"},
  			include_player_ids: userDevices
		};

		sendNotification(message);
		*/

		return res.json(result)
	});
}




exports.sendNotification = function(requ,res,next) {
	var data={
		"app_id":"84591d87-0267-4172-a9f1-f5a34048f4b3",
		"include_player_ids":requ.users,
		"contents": {"en": requ.msg}
	}


	console.log("notif data ",data);
	/*
  var headers = {
    "Content-Type": "application/json",
    "Authorization": "Basic ZjA4NWEyMGItNDk0NS00OTk1LWEwZTAtZDQ4NWVkNmJkM2I4"
  };
  
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };
  
  var https = require('https');
  var req = https.request(options, function(res) {  
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });
  
  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });

  
  req.write(JSON.stringify(data));
  return req.end();
 */	
};

/*
var message = { 
  		app_id: "84591d87-0267-4172-a9f1-f5a34048f4b3",
  		contents: {"en": text},
  		include_player_ids: users
	};*/




