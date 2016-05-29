var io;
var clients={};
module.exports.init =  function (http) {
    io = require('socket.io')(http);

    io.on('connection', function (socket) {
        //console.log("##############   sockets active   ##############");

        socket.on('connect_failed', function(cf){ console.log('socket failed',cf) });
        socket.on('disconnect', function ( cd ) { console.log('socket disconnected',cd) });

    });
}

module.exports.onUserConnected = function(user){
    console.log('onUserConnected socket',user._id)
    var nsp = io.of(user._id);
    clients[user._id] = nsp;
    //console.log("sockets on user connected","*****************"+Object.keys(io.nsps)+"*****************")
    setTimeout(function(){
        nsp.emit('on user connected', 'welcome '+user.name);

        setInterval(function(){
            nsp.emit('ping', 'ping');
        },10000);


    },1000)

}

module.exports.newEventReceived = function(toUsers,notification){
    //console.log("newEventReceived","*****************"+Object.keys((io)?io.nsps:"no users connected")+"*****************")
    //console.log("newEventReceived","*****************",toUsers,"*****************")
    toUsers.forEach(function(val){
        var index = (io)?Object.keys(io.nsps).indexOf("/"+val):-1;
        if (index != -1) {
            try {
                //console.log("newEventReceived to"+val)
                clients[val].emit('newEventReceived',notification);
            }catch (err){
               console.log('newEventReceived sockets notification',err)
            }
        }
    })
}

module.exports.newMessageReceived = function(toUsers,message){
    //console.log("newEventReceived","*****************"+Object.keys((io)?io.nsps:"no users connected")+"*****************")
    //console.log("newEventReceived","*****************",toUsers,"*****************")
    toUsers.forEach(function(val){
        var index = (io)?Object.keys(io.nsps).indexOf("/"+val):-1;
        if (index != -1) {
            try {
                //console.log("newEventReceived to"+val)
                clients[val].emit('newMessageReceived',message);
            }catch (err){
                console.log('message sockets newMessageReceived',err)
            }
        }
    })
}
