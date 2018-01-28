var http = require('http');
var request = require('request');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var backupPortNumber = 5000;
var allProducts = {};


//GET THE LIST OF COMMON EVENTS TO SUBSCRIBE TO. 
//event_list_ws
var EVENT_LIST_WS = require('./zoneChangeNotifications').list();
var paperList = require('./zoneChangeNotifications').paperList();
var palletList = require('./zoneChangeNotifications').palletList();
var drawEndExecution = require('./zoneChangeNotifications').drawEndExecution();

var SIMULATOR_PORT = 3000;
var SIMULATOR_IP = "localhost";
var SIMULATOR_ADRESS = "http://" + SIMULATOR_IP + ":" + SIMULATOR_PORT + "/RTU/";	//"http://localhost:3000/RTU/Sim"



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
							// LOGIC CAN BE SHIFTED TO ANOTHER FILE........... This is pure subscription logic.......................
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//console.log(paperList.paperLoaded);
//console.log(paperList.paperUnLoaded);

//console.log(palletList.palletLoaded);
//console.log(palletList.palletUnLoaded);

//SEND POST REQUEST FOR SUBSCRIPTION........................
function SendSubscriptionRequest(sub_options, fakeFlag){
	
		request(sub_options, function (err, res, body) //request to subscribe workstation to draw end execution event of cooresponding robot
		{
			if (err)
			{
				console.log('Error :', err);
				return;
			}
			else{
				//CODE FORDEBUGGING PURPOSES..............
				if(fakeFlag == "MOVE_PALLET"){
					console.log("------------  PALLET MOVED  ------------ " + body);
				}
				else{
					console.log("------------  SUBSCRIBED  ------------ " + body);
				}
			}
			
		});		
	
}

//GET URL ARRAY FOR EACH WORK STATION...........................
function getEventsToSubscribe(conveyorName, robotName, workStationNumber){
		
		var robotUrl = SIMULATOR_ADRESS + robotName;	//For SimROB7	=> FOR ROBOTS.
		var conveyorUrl = SIMULATOR_ADRESS + conveyorName;	//For SimCNV7	=> FOR CONVEYORS.
		
		var url = [];
		switch (workStationNumber) {
			case 1:
				url.push((robotUrl + paperList.paperLoaded));
				url.push((robotUrl + paperList.paperUnLoaded));
				break;
			case 7:
				url.push((robotUrl + palletList.palletLoaded));
				url.push((robotUrl + palletList.palletUnLoaded));
				break;
			default:
				url.push((robotUrl + drawEndExecution));
				break;
		}
		
		for(i=0;i<EVENT_LIST_WS.length;i++) //subscribing to all zone changes of the workstation to its server
		{
			//console.log(conveyorUrl+EVENT_LIST_WS[i]);
			url.push((conveyorUrl+EVENT_LIST_WS[i]));
		}		
		
		return url;
	
}


//SUBSCRIBE FUNCTION FOR EACH CONVEYOR...............................
//name will be CNV1,2,3.....12.
//this.port, this.url, this.conveyorName , this.robotName ,this.workStationNumber
function subscriber(port,url,conveyorName, robotName, workStationNumber) //subscribing the workstation servers to their cooresponding events
{
	
	var urlToSubscribe = [];
	urlToSubscribe = getEventsToSubscribe(conveyorName, robotName, workStationNumber);
	var destUrl = "http://" + url + ":" + port + "/";
	
	//SUBSCRIBE to palletLoading,unloading, paperloading,unloading and drawEndExecution................
	for(var i=0;i < urlToSubscribe.length; i++){
	
		var sub_options =
		{
			"method": "POST",
			json: true,
			body: {"destUrl":destUrl}, //body for subscription as given in the instructions
			url: urlToSubscribe[i],
			headers:
			{
				"content-type": "application/json",
				"cache-control": "no-cache"
			}
		};		
			
		SendSubscriptionRequest(sub_options);	
		
	}
	
	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
							// LOGIC CAN BE SHIFTED TO ANOTHER FILE........... This is pure subscription logic.......................
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var WorkStation = function WorkStation(Port,workStationNumber,url)
{	
	this.port = Port === undefined ? (backupPortNumber, backupPortNumber++ ) : (Port);
	this.workStationNumber = workStationNumber;
	this.name="WS_"+workStationNumber;
	this.station_number = workStationNumber;
	this.robotName = "SimROB"+workStationNumber;
	this.conveyorName = "SimCNV"+workStationNumber;
	this.job_queue = 0; //number of jobs assigned to the workstation(agent)
	this.url= url || 'localhost';
	
	//MIGHT NOT BE NEEDED.
	this.currentService="";
	this.robotUrl = "http://localhost:3000/RTU/" + this.robotName + "/services/"+this.currentService;
	this.coneyorUrl = "http://localhost:3000/RTU/" + this.conveyorName + "/services/"+this.currentService;	
}

///////////////////////// Creating a dedicated server for each workstation(agent) /////////////////////
WorkStation.prototype.runServer = function ()
{	
	console.log("--------- RUNSERVER ---------");
    var ref = this;
    var myServer = http.createServer(function(req, res)
    {
        var method = req.method;
       // console.log("Method: " + method);
        if(method == 'GET')
        {
            //Handle GET method.
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json' );
            res.end('Agent ' + ref.name + ' is running.');
        }
        else if(method == 'POST') //post method handling
        {
            //Handle POST method.
            var body = "";
			var objects;
            req.on('data', function (chunk)
            {
				body += chunk;
                objects=JSON.parse(body);
				console.log("............... Recieved Notification ...............");
				console.log(objects);
                if (objects.id == "PalletLoaded") // creating a new pallet object when pallet is loaded
                {
					var palletID =objects.payload.PalletID;
					palletID = parseInt(palletID);
					var stringpalletID = palletID.toString();
					allProducts[stringpalletID] = new Pallet_data(palletID);
					
					
					//pallet[n]=new Pallet_data(objects.payload.PalletID); //creating pallet object and putting it in the array of pallets at pallet ID location
                }
				//ref.doeverything(objects); //main logic about what to do once an event notification comes to the workstation(agent) server
				console.log("............... SOME THING HAPPENED => "  +  ref.workStationNumber + " ...............");
				ref.resumeProcess(objects); //main logic about what to do once an event notification comes to the workstation(agent) server
            });
        req.on('end', function (){})
        res.end('OK');
        }
    });
    myServer.listen(this.port, this.url, () =>
    {
        setTimeout(subscriber.bind(null,this.port, this.url, this.conveyorName , this.robotName ,this.workStationNumber), 1000); // subscribing to the events required by the agent(workstation)
        console.log('Agent server ' + this.name + ' is running at http://' + this.url + ':' + this.port);
    });
	
}

///////////////// function to move pallet from zone ZC to ZN /////////////////
WorkStation.prototype.MovePallet = function (sourceZone,destinationZone)
{
    //console.log("http://127.0.0.1:3000/RTU/Sim"+this.c_name+"/services/" + "TransZone"+ZC+ZN);
	var urlToExecute = SIMULATOR_ADRESS + this.conveyorName + "/services/TransZone" + sourceZone+destinationZone;
	var destUrl = "http://" + this.url + ":" + this.port + "/";
    var options =
    {
		method: 'post',
		json: true,
		body: {"destUrl":destUrl}, //body for the service as given in the instructions
		url: urlToExecute, //serive url to move pallet form one zone to another
		headers:
			{
				"content-type": "application/json",
				"cache-control": "no-cache"
			}
    };
    //Print the result of the HTTP POST request
	SendSubscriptionRequest(options, "MOVE_PALLET");
	
};

WorkStation.prototype.LoadPaper = function (palletID)
{
    //console.log("http://127.0.0.1:3000/RTU/Sim"+this.c_name+"/services/" + "TransZone"+ZC+ZN);
	var urlToExecute = SIMULATOR_ADRESS + this.robotName + "/services/LoadPaper";
	var destUrl = "http://" + this.url + ":" + this.port + "/";
    var options =
    {
		method: 'post',
		json: true,
		body: {"destUrl":destUrl}, //body for the service as given in the instructions
		url: urlToExecute, //serive url to move pallet form one zone to another
		headers:
			{
				"content-type": "application/json",
				"cache-control": "no-cache"
			}
    };
    //Print the result of the HTTP POST request
	SendSubscriptionRequest(options, "Load_PAPER");
	
};

WorkStation.prototype.resumeProcess = function (eventNotification)
{	
/*
#	Event ID	Notification Body
1	PaperLoaded	{ id: 'PaperLoaded',senderID: 'ROB1', lastEmit: '2015-08-21T08:11:54.861Z',payload: {} }
2	PaperUnloaded	{ id: 'PaperUnloaded', senderID: 'ROB1', lastEmit: '2015-08-21T08:12:03.281Z', payload: {} }
3	PalletLoaded	{ id: 'PalletLoaded', senderID: 'ROB7', lastEmit: '2015-08-21T08:12:49.234Z', payload: { PalletID: 1440144769228 } }
4	PalletUnloaded	{ id: 'PalletUnloaded', senderID: 'ROB7', lastEmit: '2015-08-21T08:13:06.879Z', payload: {} }
5	PenChanged	{ id: 'PenChanged', senderID: 'ROB8', lastEmit: '2015-08-21T08:13:30.686Z', payload: { PenColor: 'BLUE' } }
6	DrawStartExecution	{ id: 'DrawStartExecution', senderID: 'ROB8', lastEmit: '2015-08-21T08:13:54.616Z', payload: { Recipe: '2' } }
7	DrawEndExecution	{ id: 'DrawEndExecution', senderID: 'ROB8', lastEmit: '2015-08-21T08:13:58.637Z', payload:{ PalletID: 1440143790832, Recipe: '2', ManufacturingID: 'ROB81440144838637', Color: 'BLUE' } }
8	LowInkLevel	{id : 'LowInkLevel',	senderID : 'ROB8',	lastEmit : '2015-08-21T08:13:58.637Z', payload : {Color: 'BLUE'}}
9	OutOfInk	{id : 'OutOfInk', senderID : 'ROB8', lastEmit : '2015-08-21T08:13:58.637Z', payload : {Color: 'BLUE'}}
10	Z4_Changed	{ id: 'Z4_Changed', senderID: 'CNV10', lastEmit: '2015-08-21T08:11:41.520Z', payload: { PalletID: -1 } }
*/
	
	var palletID = eventNotification.payload.PalletID;
	//console.log("NOTIFICATION:   " + palletID);
	//this.MovePallet(3,5);
	if( palletID == '-1' || allProducts[palletID]===undefined){
		return;
	}
	console.log("NOTIFICATION:   " + JSON.stringify(eventNotification.payload));
	console.log("NOTIFICATION:   " + JSON.stringify(allProducts[palletID]));
	
	var stringPalletID = palletID.toString();
	var currentPalltet = allProducts[stringPalletID];
	var isPaperLoaded = currentPalltet.paperLoaded;
	if(!isPaperLoaded){
			if(currentPalltet.currentZone === 5){
				currentPalltet.currentZone = 1;
				currentPalltet.nextZone = 2;
				currentPalltet.nextWorkStation++;
				currentPalltet.currentWorkStation++;
			}
			else{
				
				if(currentPalltet.currentZone === 3){
					currentPalltet.nextZone = 5;
				}  
				else if (currentPalltet.currentZone === 2){
					currentPalltet.nextZone = 3;
				}
				
			}
			
					
			if (this.workStationNumber===1 && currentPalltet.currentZone===3)
			{
				this.LoadPaper(palletID);
				currentPalltet.paperLoaded = true;
			}
			else{
			this.MovePallet(currentPalltet.currentZone,currentPalltet.nextZone);
			//currentPalltet.nextZone++;
			}
			currentPalltet.currentZone = currentPalltet.nextZone;		
		
	}
	else{
		console.log("................................. PAPER LOADED .................................");
		
	}


}



//function WorkStation(Port,workStationNumber,url);
//var SimCNV7 = new WorkStation(5000,7,'localhost');
//SimCNV7.runServer();

///////////////////////////////////////////////////////////////
		//START THE MULTI AGENT SYSTEM...........
///////////////////////////////////////////////////////////////
var SimCNV7 = new WorkStation(5000,7,'localhost');
var SimCNV8 = new WorkStation(5001,8,'localhost');
var SimCNV9 = new WorkStation(5002,9,'localhost');

var SimCNV10 = new WorkStation(5003,10,'localhost');
var SimCNV11 = new WorkStation(5004,11,'localhost');
var SimCNV12 = new WorkStation(5005,12,'localhost');
var SimCNV1 = new WorkStation(5006,1,'localhost');
var SimCNV2 = new WorkStation(5007,2,'localhost');
var SimCNV3 = new WorkStation(5008,3,'localhost');
var SimCNV4 = new WorkStation(5009,4,'localhost');
var SimCNV5 = new WorkStation(50010,5,'localhost');
var SimCNV6 = new WorkStation(50011,6,'localhost');


SimCNV7.runServer(); //calling run server function for all the objects which will then eventually call doeverything function where all the logic is designed
SimCNV8.runServer();
SimCNV9.runServer();

SimCNV10.runServer();
SimCNV11.runServer();
SimCNV12.runServer();
SimCNV1.runServer();
SimCNV2.runServer();
SimCNV3.runServer();
SimCNV4.runServer();
SimCNV5.runServer();
SimCNV6.runServer();


///////////////////////////////////////////////////////////////
		//START THE MULTI AGENT SYSTEM...........
///////////////////////////////////////////////////////////////








///////////////////////////////////////////////////////////////
		//PALLET LOGIC STARTS HERE................
///////////////////////////////////////////////////////////////

var Pallet_data= function Pallet_data(Pallet_id)
{
    this.id= Pallet_id; // Pallet id number
    this.job_done=false; // flag to check if all the paint jobs are done
    this.paper_added=false; //flag to check if paper is added on the pallet
	/*
    this.capability_needed_s = 0; //recipe required for screen(screen type needed)
	this.capability_needed_k = 0; //recipe required for keyboard(keyboard type needed)
	this.capability_needed_f = 0; //recipe required for frame(frame type needed)
    this.station_to_go_s = 0; //station number where screen will be printed
    this.station_to_go_k = 0; //station number where keyboard will be printed
    this.station_to_go_f = 0; //station number where frame will be printed
	*/
	//this.station_to_go = 0;
    this.screen_done = false; //flag to check if screen has been printed
    this.keyboard_done = false; //flag to check if keyboard has been printed
    this.framme_done = false; //flag to check if frame has been printed
    
    this.screen=[JSON.stringify(randomInt(4,7)),JSON.stringify(randomInt(1,4))]; //randomly assigned screen type(4-6) and colour(1-3)
    this.keyboard=[JSON.stringify(randomInt(7,10)),JSON.stringify(randomInt(1,4))]; //randomly assigned keyboard type(7-9) and colour(1-3)
    this.framme=[JSON.stringify(randomInt(1,4)),JSON.stringify(randomInt(1,4))]; //randomly assigned frame type(1-3) and colour(1-3)
	
	this.paperLoaded = false;
	
	//WHEN PALLET LOADED.........
	this.currentZone = 3;
	this.nextZone = 5;
	this.currentWorkStation = 7;
	this.nextWorkStation = 8;
    
};

function randomInt (low, high) //function to generate random numbers low inclusive high exclusive
{
    return Math.floor(Math.random() * (high - low) + low);
}

///////////////////////////////////////////////////////////////
		//PALLET LOGIC STARTS HERE................
///////////////////////////////////////////////////////////////




















