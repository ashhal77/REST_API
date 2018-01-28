//ashal//
var request = require('request');
//ashal//
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var registeredSockets = [];
var abc = "";

//ashal//
var bodyParser = require('body-parser');
var myDestUrl = "http://192.168.10.100:3002/move";

var PORT = 3002;
var bodyParser = require('body-parser');
//ashal//


app.get('/a',function(req,res){
	console.log('sending to : '+abc);
	registeredSockets[abc].emit( 'message',{message:"event-called"} );
	res.send({"hello":"Ashhal here"});
})

io.on('connection',function(socket){
	console.log('one user connected'+socket.id);
	abc = socket.id;
	registeredSockets[socket.id] = socket;
	socket.emit('message',{message:"adnan-outside LOG"})
	
	socket.on('disconnect',function(){
		console.log('one user disconnected'+socket.id);
	})

	socket.on('message',function(data){
		console.log(data);
		socket.emit('message',{message:"adnan-I am inside LOG"})

	})
})

http.listen(3002,function(){
	console.log('server listening on port: '+PORT);
})


//ashal//
app.use(bodyParser.json());

app.get('/', function(req,res){

    res.send('Hello Express!!');          
});


app.post('/myTestNotification', function(req,res){

    console.log('BODY OF NOTIFICATION:  ', req.body);
    res.end();          
});







             ///////////////////////////////////////////////////
            ////*****Output response of zone changed*****//////  
           ///////////////////////////////////////////////////


app.post('/move', function (req, res) {

	console.log("I have called android");
	console.log(req.body.payload.PalletID);
	if(req.body.payload.PalletID == '04D866F1D02580' && req.body.senderID == 'CNV11'  && req.body.id == 'Z3_Changed' ){
  		registeredSockets[abc].emit( 'message',{message:"I have been called inside notification"} );
}
  console.log(req.body); 
  console.log("\n//////**************/////**********");


   res.end();   
  });

           //////////////////////////////////////////////////
          ////*****Output response of Drawing*****//////////  
         //////////////////////////////////////////////////




//***************************subscribing notifications*****************************
//********************start of subscription code********************************



//*******************************cnv 10 subcription checkpoint 1**********************************************

 var move1_options = {
  "method": "POST",
  json: true, 
  body: {"destUrl":myDestUrl},
  url: "http://192.168.10.2/rest/events/Z1_Changed/notifs",
  headers: {
            "content-type": "application/json",
			"cache-control": "no-cache"
        }
    };

	request(move1_options, function (err, res, body) {
		
				if (err) {
				console.log('Error :', err);
				return;
				}
	
				console.log("**************************************************");
				console.log("Z1 has been SUBSCRIBED FOR WORK STATION 10..... .");
				console.log(body);
				console.log("**************************************************");



			});


  //*****************************cnv 10 checkpoint  2************************

 var move1_options = {
  "method": "POST",
  json: true, 
  body: {"destUrl":myDestUrl},
  url: "http://192.168.10.2/rest/events/Z2_Changed/notifs",
  headers: {
            "content-type": "application/json",
			"cache-control": "no-cache"
        }
    };

	request(move1_options, function (err, res, body) {
		
				if (err) {
				console.log('Error :', err);
				return;
				}
	
				console.log("**************************************************");
				console.log("Z2 has been SUBSCRIBED FOR WORK STATION 10...... .");
				console.log(body);
				console.log("**************************************************");
			});

 	//**************************************************


  //********************* cnv 10 check point 3*****************************


 var move1_options = {
  "method": "POST",
  json: true, 
  body: {"destUrl":myDestUrl},
  url: "http://192.168.10.2/rest/events/Z3_Changed/notifs",
  headers: {
            "content-type": "application/json",
			"cache-control": "no-cache"
        }
    };

	request(move1_options, function (err, res, body) {
		
				if (err) {
				console.log('Error :', err);
				return;
				}
				
				console.log("**************************************************");
				console.log("Z3 has been SUBSCRIBED FOR WORK STATION 10...... .");
				console.log(body);
				console.log("************tetkng**************************************");
			});

 	//**************************************************

 	//*********************cnv 10 check point 5*****************************


 var move1_options = {
  "method": "POST",
  json: true, 
  body: {"destUrl":myDestUrl},
  url: "http://192.168.10.2/rest/events/Z5_Changed/notifs",
  headers: {
            "content-type": "application/json",
			"cache-control": "no-cache"
        }
    };

	request(move1_options, function (err, res, body) {
		
				if (err) {
				console.log('Error :', err);
				return;
				}
	
				console.log("**************************************************");
				console.log("Z5 has been SUBSCRIBED FOR WORK STATION 10...... .");
				console.log(body);
				console.log("**************************************************");
			});

 	//**************************************************

//*********************cnv 11 check point 1*****************************


 var move1_options = {
  "method": "POST",
  json: true, 
  body: {"destUrl":myDestUrl},
  url: "http://192.168.11.2/rest/events/Z1_Changed/notifs",
  headers: {
            "content-type": "application/json",
			"cache-control": "no-cache"
        }
    };

	request(move1_options, function (err, res, body) {
		
				if (err) {
				console.log('Error :', err);
				return;
				}
	
				console.log("**************************************************");
				console.log(" Z1 has been SUBSCRIBED FOR WORK STATION 11...... .");
				console.log(body);
				console.log("**************************************************");
			});

 	//**************************************************


//*********************cnv 11 check point 2*****************************


 var move1_options = {
  "method": "POST",
  json: true, 
  body: {"destUrl":myDestUrl},
  url: "http://192.168.11.2/rest/events/Z2_Changed/notifs",
  headers: {
            "content-type": "application/json",
			"cache-control": "no-cache"
        }
    };

	request(move1_options, function (err, res, body) {
		
				if (err) {
				console.log('Error :', err);
				return;
				}
	
				console.log("**************************************************");
				console.log(" Z2 has been SUBSCRIBED FOR WORK STATION 11...... .");
				console.log(body);
				console.log("**************************************************");
			});

 	//**************************************************


//*********************cnv 11 check point 1*****************************


 var move1_options = {
  "method": "POST",
  json: true, 
  body: {"destUrl":myDestUrl},
  url: "http://192.168.11.2/rest/events/Z3_Changed/notifs",
  headers: {
            "content-type": "application/json",
			"cache-control": "no-cache"
        }
    };

	request(move1_options, function (err, res, body) {
		
				if (err) {
				console.log('Error :', err);
				return;
				}
	
				console.log("**************************************************");
				console.log(" Z3 has been SUBSCRIBED FOR WORK STATION 11...... .");
				console.log(body);
				console.log("**************************************************");
			});

 	//**************************************************


//*********************cnv 11 check point 1*****************************


 var move1_options = {
  "method": "POST",
  json: true, 
  body: {"destUrl":myDestUrl},
  url: "http://192.168.11.2/rest/events/Z5_Changed/notifs",
  headers: {
            "content-type": "application/json",
			"cache-control": "no-cache"
        }
    };

	request(move1_options, function (err, res, body) {
		
				if (err) {
				console.log('Error :', err);
				return;
				}
	
				console.log("**************************************************");
				console.log(" Z5 has been SUBSCRIBED FOR WORK STATION 11...... .");
				console.log(body);
				console.log("**************************************************");
			});

 	//**************************************************







 	//********************End of subscription code********************************
//*****************************************************************************








//*************************Start of code for running the pallets*****************************



//**********************conveyor 10 zone 12 *************10000************
    setTimeout(function(){
    var load_options = {
    "method": "POST",
    json: true, 
   body: {},
   url: 'http://192.168.10.2/rest/services/TransZone12',
    headers: {
              "content-type": "application/json",
              "cache-control": "no-cache"

          }
      };

    request(load_options, function (err, res, body) {
      
          if (err) {
          console.log('Error :', err);
          return;
        }
            
      });
     },3000)
  
   //**********************conveyor 10 zone 23 ***********150000**************
    setTimeout(function(){
    var load_options = {
    "method": "POST",
    json: true, 
   body: {},
   url: 'http://192.168.10.2/rest/services/TransZone23',
    headers: {
              "content-type": "application/json",
              "cache-control": "no-cache"

          }
      };

    request(load_options, function (err, res, body) {
      
          if (err) {
          console.log('Error :', err);
          return;
        }
            
      });
     },8000)

     //**********************conveyor 10 zone 35 *************************
    setTimeout(function(){
    var load_options = {
    "method": "POST",
    json: true, 
   body: {},
   url: 'http://192.168.10.2/rest/services/TransZone35',
    headers: {
              "content-type": "application/json",
              "cache-control": "no-cache"

          }
      };

    request(load_options, function (err, res, body) {
      
          if (err) {
          console.log('Error :', err);
          return;
        }
            
      });
     },15000)


    //**********************conveyor 11 zone 12 *************************
    setTimeout(function(){
    var load_options = {
    "method": "POST",
    json: true, 
   body: {},
   url: 'http://192.168.11.2/rest/services/TransZone12',
    headers: {
              "content-type": "application/json",
              "cache-control": "no-cache"

          }
      };

    request(load_options, function (err, res, body) {
      
          if (err) {
          console.log('Error :', err);
          return;
        }
            
      });
     },21000)

   //   //**********************conveyor 11 zone 23 *************************
    setTimeout(function(){
    var load_options = {
    "method": "POST",
    json: true, 
   body: {},
   url: 'http://192.168.11.2/rest/services/TransZone23',
    headers: {
              "content-type": "application/json",
              "cache-control": "no-cache"

          }
      };

    request(load_options, function (err, res, body) {
      
          if (err) {
          console.log('Error :', err);
          return;
        }
            
      });
     },27000)

      //**********************conveyor 11 zone 35 *************************
    setTimeout(function(){
    var load_options = {
    "method": "POST",
    json: true, 
   body: {},
   url: 'http://192.168.11.2/rest/services/TransZone35',
    headers: {
              "content-type": "application/json",
              "cache-control": "no-cache"

          }
      };

    request(load_options, function (err, res, body) {
      
          if (err) {
          console.log('Error :', err);
          return;
        }
            
      });
     },35000)
//ashal//