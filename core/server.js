var os = require('os');
var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
var fs = require("fs-extra");

app = express();
var http = require('http').Server(app);

//TODO sockest for messages

app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser({limit: '5mb'})); 
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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


//temp
// app.use('/login', express.static(process.env.PWD + '/client/views/login/index.html'));
// app.use('/home', express.static(process.env.PWD + '/client/views/home/index.html'));
// app.use('/create', express.static(process.env.PWD + '/client/views/EventFlow/index.html'));
// app.use('/main', express.static(process.env.PWD + '/client/views/main.html'));
// app.use('/playzer', express.static(process.env.PWD + '/client/views/profile/index.html'));
// app.use('/register', express.static(process.env.PWD + '/client/views/register/index.html'));

// app.use('/assets/fonts', express.static(process.env.PWD + '/client/Assets/fonts'));
// app.use('/assets/img', express.static(process.env.PWD + '/client/Assets/img'));
// app.use('/fonts', express.static(process.env.PWD + '/client/assets/fonts'));
// app.use('/index.html', express.static(process.env.PWD + '/client/views/index.html'));
// app.use('/js', express.static(process.env.PWD + '/client/js'));
// app.use('/css', express.static(process.env.PWD + '/client/css'));
// app.use('/assets', express.static(process.env.PWD + '/client/Assets'));

//REST API
//events
app.post('/events/:id', controllers.eventsController.create);
app.post('/events/users/:id', controllers.eventsController.addUser);
app.get('/events/:id', controllers.eventsController.getList);
app.get('/events/other/:id', controllers.eventsController.getOtherList);
app.get('/events/today/:id', controllers.eventsController.getTodayOtherList);
app.get('/events/tomorrow/:id', controllers.eventsController.getTomorrowOtherList);
app.get('/events/negotiable/:id', controllers.eventsController.getNegotOtherList);
//sports
app.get('/sports', controllers.sportsController.getList);


//users
app.post('/users', controllers.usersController.create);
app.post('/users/events/:id', controllers.usersController.addEvent);
app.get('/users/events/:id', controllers.usersController.getMyEventList);
app.get('/users', controllers.usersController.getList);
app.get('/users/remove/:id', controllers.usersController.remove);
app.get('/users/update/:id', controllers.usersController.update);
app.get('/users/checkExist/:id', controllers.usersController.checkExist);




app.get('/*', function(req, res) 
{
    //console.log({data:'page not found', url: req.url});
    res.json({msg:['page not allowed '+app.locals.name]});
});
