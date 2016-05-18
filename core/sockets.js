var io;
var clients={};
module.exports.init =  function (http) {
    io = require('socket.io')(http);

    io.on('connection', function (socket) {
        //console.log("##############   sockets active   ##############");

        socket.on('connect_failed', function(){ });
        socket.on('disconnect', function () {  });

    });
}

module.exports.onUserConnected = function(user){
    delete io.nsps['/'+user._id];
    var nsp = io.of('/'+user._id);
    clients[user._id] = nsp;
    //console.log("sockets on user connected","*****************"+Object.keys(io.nsps)+"*****************")
    setTimeout(function(){
        nsp.emit('on user connected', 'welcome '+user.name);

        setInterval(function(){
            nsp.emit('ping', 'ping');
        },10000)
    },1000)

}

module.exports.newEventReceived = function(toUsers,notification){
    //console.log("on post change","*****************"+Object.keys((io)?io.nsps:"no users connected")+"*****************")
    toUsers.forEach(function(val){
        var index = (io)?Object.keys(io.nsps).indexOf("/"+val._id):-1;
        if (index != -1) {
            try {
                clients[val._id].emit('on event received',notification);
            }catch (err){
               console.log('sockets notification',err)
            }
        }
    })
}

