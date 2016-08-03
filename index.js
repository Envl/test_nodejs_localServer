var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

var _rooms={};

app.get('/',function(req,res){
	res.send('Hello world');
});


http.listen(180,function () {
	console.log('listening on *:180');
});

io.on('connection',function(socket){
    socket.on('create room',function(roomName){
        //房间不存在  可以创建
        if(_rooms[roomName]==null){
            _rooms[roomName]=1;
            socket.emit("create_rsp","ok");
        }
    })
});
var tmp;

tmp=setInterval(autoTick(),1000);

function autoTick(socket) {
    // socket.emit('bullet','autotick');
    console.log('autotick');
}