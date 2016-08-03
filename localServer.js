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


function autoTick(socket) {
  socket.emit('bullet','autotick');
  console.log('autotick');
}

io.on('connect',function(socket){
	console.log('someone connected');
	socket.emit('bullet','connected to server!');
 	socket.on('create_room',function(roomName){
	  	//房间不存在 可以创建
	  	if(_rooms[roomName]==null){
	  		_rooms[roomName]=1;
	  		console.log('created room '+roomName);
	  		socket.emit("create_rsp","ok");
			setInterval(()=>{autoTick(socket)},1000);

	  	}
  	});
});


