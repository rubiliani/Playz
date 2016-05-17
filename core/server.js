var os = require('os');
var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
var fs = require("fs-extra");

app = express();
var http = require('http').Server(app);

//TODO sockest for messages

app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, uid");
  next();
});

var port = process.env.PORT || 3000;
app.set('port', port);

app.locals.name = 'Playz';

var controllers = { },controllers_path = process.cwd() + '/controllers';
console.log("loading controllers")

fs.readdirSync(controllers_path).forEach(function (file) 
{
    if (file.indexOf('.js') != -1) 
    {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
    }
});

process.on("uncaughtException", function(err) 
{
  console.log({data:'uncaughtException', error: err.stack}); 
});

http.listen(app.get('port'), function() 
{
  console.log(app.locals.name+' server running...');
  console.log('Port: '+ app.get('port'));
  console.log('Mode: ' + env );
  console.log(new Date());
});

var env = process.env.NODE_ENV || 'development';
if ('development' == env) { }
else{ }

global.authenticating_user=function(req,res,next){
    var r = {msg:[],status:0};
    var uid = req.headers.uid;

    if (typeof (uid) !== 'string'){
        r.msg.push('headers not found',uid)
        return res.status(404).json(r);
    }
    User.get_user(uid,function(result){
        if (!result.status){
            r.msg.push('user not found')
            return res.status(404).json(r);
        }
        req.user = result.user;
        next();
    })
}

app.get('/', function(req,res,next){ });
//events
app.post('/events/createEvent', authenticating_user, controllers.eventsController.create);
app.post('/events/updateEvent', authenticating_user, controllers.eventsController.update);
app.post('/events/getUpcomingEvents', authenticating_user ,controllers.eventsController.getUpcomingEvents);
app.post('/events/getPastEvents', authenticating_user ,controllers.eventsController.getPastEvents);

///notifications
app.post('/notifications/createNotification', authenticating_user ,controllers.notificationController.createNotification);
app.post('/notifications/getNotifications', authenticating_user ,controllers.notificationController.getNotifications);



// app.post('/events/users/:id', controllers.eventsController.addUser);
// app.get('/events/:id', controllers.eventsController.getList);
// app.get('/events/other/:id', controllers.eventsController.getOtherList);
// app.get('/events/today/:id', controllers.eventsController.getTodayOtherList);
// app.get('/events/tomorrow/:id', controllers.eventsController.getTomorrowOtherList);
// app.get('/events/negotiable/:id', controllers.eventsController.getNegotOtherList);

//sports
app.get('/sports', controllers.sportsController.getList);


//users
app.post('/users/update_user', controllers.usersController.update_user);
//app.post('/users', controllers.usersController.create);
//app.post('/users/events/:id', controllers.usersController.addEvent);
//app.get('/users/events/:id', controllers.usersController.getMyEventList);
//app.get('/users', controllers.usersController.getList);
//app.get('/users/remove/:id', controllers.usersController.remove);
//app.get('/users/update/:id', controllers.usersController.update);
//app.get('/users/checkExist/:id', controllers.usersController.checkExist);




app.get('/*', function(req, res) 
{
    //console.log({data:'page not found', url: req.url});
    res.json({msg:['page not allowed '+app.locals.name]});
});
