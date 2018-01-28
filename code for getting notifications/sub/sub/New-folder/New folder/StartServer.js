//var AGENTSURL = "192.168.10.111";
var AGENTSURL = "192.168.10.102";
/*
var USER_ORDER = [
	{	
		"framerecipe": 1,
		"keyboardrecipe": 9,
		"screenrecipe": 5,
		"framecolor": "RED",
		"screencolor": "GREEN",
		"keyboardcolor": "BLUE"

	},
	{	
		"framerecipe": 1,
		"keyboardrecipe": 9,
		"screenrecipe": 5,
		"framecolor": "RED",
		"screencolor": "RED",
		"keyboardcolor": "RED"
	}
];
*/
var orchestrator = require('./orchestrator').startOrchestrator;
var setOrder = require('./orchestrator').setOrder;
orchestrator(AGENTSURL);
//setOrder(USER_ORDER);
/*
setTimeout(function(){
setOrder(USER_ORDER);
},10000);
*/

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));
var path    = require("path");

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/',function(req,res){
   
     res.sendFile(path.join(__dirname+'/Frontend.html'));

});

app.post("/getPalletInfo", function(req, res) {
	
	console.log(req.body);
	var palletData;
	if(req.body && req.body.length > 0){
			palletData = req.body;
			var palletnumber = palletData.length;
			setOrder(palletData);
			res.send('DONE');
	}
	else{
		res.send('ERROR.....');
	}
	
});


app.listen(2999,function()
{
	console.log('Server is started on port 2999'); 

});
