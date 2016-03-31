
var express 			= require('express'),

	app 				= express(),
	bodyParser			= require('body-parser'),
	mongoose			= require('mongoose'),
	eventsController 	= require('./server/controllers/events-controller.js');
	var path = require('path');
	usersController 	= require('./server/controllers/users-controller.js');
	sportsController 	= require('./server/controllers/sports-controller.js');
	var port = process.env.PORT || 1337;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/views/index.html');

});


//mongoose.connect('mongodb://admin:123@ds059284.mlab.com:59284/playz');
mongoose.connect('mongodb://admin:123@ds059284.mlab.com:59284/playz');

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
app.use('/login.html', express.static(__dirname + '/client/views/login.html'));
app.use('/home', express.static(__dirname + '/client/views/home.html'));
app.use('/create', express.static(__dirname + '/client/views/EventFlow/index.html'));

app.use(express.static(process.cwd() + 'client/assets'));
console.log(process.cwd());
console.log(__dirname);

app.use('/assets/fonts', express.static(__dirname + '/client/assets/fonts'));
app.use('/assets/img', express.static(__dirname + '/client/assets/img'));
app.use('/fonts', express.static(__dirname + '/client/assets/fonts'));
app.use('/index.html', express.static(__dirname + '/client/views/index.html'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/assets', express.static(__dirname + '/client/assets'));

//REST API
app.post('/api/events/:id', eventsController.create);
app.get('/api/events/:id', eventsController.getList);

app.get('/api/sports', sportsController.getList);


app.post('/api/users', usersController.create);
app.get('/api/users', usersController.getList);
app.get('/api/users/remove/:id', usersController.remove);
app.get('/api/users/update/:id', usersController.update);
app.get('/api/users/checkExist/:id', usersController.checkExist);


app.listen(port, function(){
	console.log('im listening');
})
