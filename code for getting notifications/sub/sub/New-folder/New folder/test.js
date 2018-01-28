var backupPortNumber=5000;


var event_list_ws = require('./zoneChangeNotifications').list();
var paperList = require('./zoneChangeNotifications').paperList();
var palletList = require('./zoneChangeNotifications').palletList();
var drawEndExecution = require('./zoneChangeNotifications').drawEndExecution();


var drawingCommands = require('./drawSpecifiedOrder');

console.log("********************************************");
	console.log(drawingCommands.drawFrame("7","SimROB3"));
	console.log(drawingCommands.drawScreen("4","SimROB3"));
	console.log(drawingCommands.drawKeyboard("8","SimROB3"));
console.log("********************************************");
//drawFrame
//drawScreen
//drawKeyboard


var SIMULATOR_PORT = 3000;
var SIMULATOR_IP = "localhost";
var SIMULATOR_ADRESS = "http://" + SIMULATOR_IP + ":" + SIMULATOR_PORT + "/RTU/";	//"http://localhost:3000/RTU/Sim"

console.log(SIMULATOR_ADRESS);
console.log("--------------------------");

function test(Port,url){
	
	this.port = Port === undefined ? (backupPortNumber, backupPortNumber++ ) : (Port);
	this.url = url || "localhost";
	
}

function getEventsToSubscribe(robotName, workStationNumber){
		
		var baseUrl = SIMULATOR_ADRESS + robotName;
		var url = [];
		switch (workStationNumber) {
			case 1:
				url.push((baseUrl + paperList.paperLoaded));
				url.push((baseUrl + paperList.paperUnLoaded));
				break;
			case 7:
				url.push((baseUrl + palletList.palletLoaded));
				url.push((baseUrl + palletList.palletUnLoaded));
				break;
			default:
				url.push((baseUrl + drawEndExecution));
				break;
		}
		
		return url;
	
}


var myTest = new test();
console.log(myTest.port);
console.log(myTest.url);
console.log("--------------------------");

var myTest = new test();
console.log(myTest.port);
console.log(myTest.url);
console.log("--------------------------");


var variableToTest = 10;
var variableToTest = parseInt(variableToTest);
console.log(variableToTest);
console.log("--------------------------");




console.log(event_list_ws);
console.log(paperList.paperLoaded);
console.log(palletList.palletLoaded);
console.log(drawEndExecution);
console.log("--------------------------");




var url = getEventsToSubscribe("SimROB3",3);
console.log(url);
console.log("--------------------------");



var myPromise =  new Promise(function(resolve, reject){ resolve(5);});


console.log("*********************************");
myPromise.then(function(val) {
    console.log(val);
}).catch(function(err) {
    console.err(err);
});
console.log("*********************************");