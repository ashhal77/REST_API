
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./config/db');
const http				= require('http').Server(app);
const io			 = require('socket.io')(http);

/*
//adnan

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

/******************************
 $(function () {
        var socket = io();
        $('form').submit(function(){
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
        });
        socket.on('chat message', function(msg){
          $('#messages').append($('<li>').text(msg));
          window.scrollTo(0, document.body.scrollHeight);
        });
      });
/*******************************/

//adnan*/


// app.get('/abc', function(req, res){

// 	console.log('hello console');
  
  //res.json({'hello':'121212'});
  /*
  io.on('connection', function(socket){
  	console.log('hello console'+socket.id);
  socket.on('8081', function(msg){
    io.emit('chat message', "121212Hello");
    console.log('hello console');
  });
});
*/

//   res.send({'hello':'121212'})
//   console.log('hello console');
// });

// io.on('connection',function(socket){
// 	console.log('one user connected'+socket.id);
// 	socket.on('disconnect',function(){
// 		console.log('one user disconnected');
// 	})
// 	socket.on('message',function(data){
// 		console.log('one '+data);
// 	})
// })


const port = 8081;

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);


app.listen(port, () => {
  console.log('We are live on ' + port);
});

})
