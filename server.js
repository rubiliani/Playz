
var express 			= require('express'),

	app 				= express(),
	bodyParser			= require('body-parser'),
	mongoose			= require('mongoose'),
	eventsController 	= require('./server/controllers/events-controller.js');
	usersController 	= require('./server/controllers/users-controller.js');
	sportsController 	= require('./server/controllers/sports-controller.js');
	var port = process.env.PORT || 1337;

	process.env.PWD = process.cwd();

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/views/login/index.html');

});


//mongoose.connect('mongodb://admin:123@ds059284.mlab.com:59284/playz');
mongoose.connect('mongodb://admin:123@ds059284.mlab.com:59284/playz');
db = mongoose.connection;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());



app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//temp
app.use('/login', express.static(process.env.PWD + '/client/views/login/index.html'));
app.use('/home', express.static(process.env.PWD + '/client/views/home/index.html'));
app.use('/create', express.static(process.env.PWD + '/client/views/EventFlow/index.html'));
app.use('/main', express.static(process.env.PWD + '/client/views/main.html'));
app.use('/playzer', express.static(process.env.PWD + '/client/views/profile/index.html'));
app.use('/register', express.static(process.env.PWD + '/client/views/register/index.html'));
app.use('/event', express.static(process.env.PWD + '/client/views/eventcard/index.html'));

app.use('/assets/fonts', express.static(process.env.PWD + '/client/Assets/fonts'));
app.use('/assets/img', express.static(process.env.PWD + '/client/Assets/img'));
app.use('/fonts', express.static(process.env.PWD + '/client/assets/fonts'));
app.use('/index.html', express.static(process.env.PWD + '/client/views/index.html'));
app.use('/js', express.static(process.env.PWD + '/client/js'));
app.use('/css', express.static(process.env.PWD + '/client/css'));
app.use('/assets', express.static(process.env.PWD + '/client/Assets'));

//REST API
//events
app.post('/api/events/:id', eventsController.create);
app.post('/api/events/users/:id', eventsController.addUser);
app.get('/api/events/:id', eventsController.getList);
app.get('/api/events/other/:id', eventsController.getOtherList);
app.get('/api/events/today/:id', eventsController.getTodayOtherList);
app.get('/api/events/tomorrow/:id', eventsController.getTomorrowOtherList);
app.get('/api/events/negotiable/:id', eventsController.getNegotOtherList);
//sports
app.get('/api/sports', sportsController.getList);


//users
app.post('/api/users', usersController.create);
app.post('/api/users/events/:id', usersController.addEvent);
app.get('/api/users/events/:id', usersController.getMyEventList);
app.get('/api/users', usersController.getList);
app.get('/api/users/remove/:id', usersController.remove);
app.get('/api/users/update/:id', usersController.update);
app.get('/api/users/checkExist/:id', usersController.checkExist);

app.listen(port, function(){
	console.log('im listening');
})
