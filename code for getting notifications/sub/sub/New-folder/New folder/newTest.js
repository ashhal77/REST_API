var request = require('request');

var SIMULATOR_PORT = 3000;
var SIMULATOR_IP = "localhost";
//var SIMULATOR_IP = "130.230.141.228";
//http://escop.rd.tut.fi:3000/instructions
var SIMULATOR_ADRESS = "http://" + SIMULATOR_IP + ":" + SIMULATOR_PORT + "/RTU/";	//"http://localhost:3000/RTU/Sim"


var DRAWING_COMMANDS = require('./drawSpecifiedOrder');

console.log("********************STARTING*********************************");


	
	

executeDrawing();


//SEND POST REQUEST FOR SUBSCRIPTION
function SendSubscriptionRequest(sub_options, fakeFlag){
	

	return new Promise(function(resolve, reject){ 
	
		request(sub_options, function (err, res, body) 
		{
			if (err)
			{
				console.log('Error :', err);
				return reject(false);
			}
			else{
				
				if(fakeFlag == "MOVE_PALLET"){
					console.log("PALLET MOVED" + body);
					resolve(true);
				}
				else{
					console.log("SUBSCRIBED");
					resolve(true);
					//console.log(body);
				
				}
			}
			
		});
	
	
	});
	
}


function executeDrawing(){

	//var drawFrame = DRAWING_COMMANDS.drawFrame("1","SimROB3");
	var drawFrame = DRAWING_COMMANDS["drawFrame"]("1","SimROB3");

	
	drawFrame = SIMULATOR_ADRESS + drawFrame;	

	var destUrl = "http://" + "localhost" + ":" + "3000" + "/";
	var options =
	{
		method: 'post',
		json: true,
		body: {"destUrl":destUrl}, 
		url: drawFrame, 
		headers:
			{
				"content-type": "application/json",
				"cache-control": "no-cache"
			}
	};	
	SendSubscriptionRequest(options);

	
	/*
	//SendSubscriptionRequest(sub_options);	
	SendSubscriptionRequest(options).then(function(val) {
		SendSubscriptionRequest(options);
	}).then(function(val) {
		SendSubscriptionRequest(options);
	}).catch(function(err) {
		console.err(err);
	});		
	*/
	
}











