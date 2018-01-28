var express = require('express');
var request = require('request');
//var argv = require('argv');
var app = express();


  //////////////////////////////////////////////////////////////////////////////
 // *****************  Output Response Of Subscription  *******************////
//////////////////////////////////////////////////////////////////////////////

              ////////////*************************//////////////
             ////*****Output response of Pallet Load*****///////
            ///////////*****************************///////////


app.post('/load', function (req, res) {
	
  console.log(req.body);
  console.log("//////**************/////**********");
  });
             ///////////////////////////////////////////////////
            ////*****Output response of zone changed*****//////  
           ///////////////////////////////////////////////////


app.post('/move', function (req, res) {
	
  console.log(req.body); 
  console.log("//////**************/////**********");
  });

           //////////////////////////////////////////////////
          ////*****Output response of Drawing*****//////////  
         //////////////////////////////////////////////////


app.post('/work', function (req, res) {

  console.log(req.body);
  console.log("//////**************/////**********");
  });



  ///////////////////////////////////////////////////////////////
 // *************  Subscription of events ********************//
///////////////////////////////////////////////////////////////


 module.exports= function Subscriber(PORT,callback)
 {

////////////////////////////////////////////////
//////*********** Pallet load ************/////
///////////////////////////////////////////////


   var load_options = {
   "method": "POST",
   json: true, 
   body: {"destUrl":"http://localhost:"+PORT+"/load"},
   url: 'http://localhost:3000/RTU/SimROB7/events/PalletLoaded/notifs',
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
 				/*console.log("**************************************************");
 				console.log("WORK STATION 7 ....... LOAD has been SUBSCRIBED.");
 				//console.log(body);
 				console.log("**************************************************");*/			

				
 			});

/////////////////////////////////////////////////
//////************* Paper load ************/////
///////////////////////////////////////////////


 	var Paper_load_options = {
   "method": "POST",
   json: true, 
   body: {"destUrl":"http://localhost:"+PORT+"/load"},
   url: 'http://localhost:3000/RTU/SimROB1/events/PaperLoaded/notifs',
   headers: {
             "content-type": "application/json",
 			"cache-control": "no-cache"

         }
     };

 	request(Paper_load_options, function (err, res, body) {
			
 				if (err) {
 				console.log('Error :', err);
 				return;
 				}
 				/*console.log("**************************************************");
 				console.log("WORK STATION 1 ....... Paper LOAD has been SUBSCRIBED.");
 				console.log(body);
 				console.log("**************************************************");	*/		

				
 			});

 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////// Zone Changings, Change Of Pen, Out of Ink, Low level of Ink and Drawing Subsription/////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

   for(i=1;i<13;i++){
      
      //console.log("ROBOT number: ", i);
  var move1_options = {
  "method": "POST",
  json: true, 
  body: {"destUrl":"http://localhost:"+PORT+"/move"},
  url: "http://localhost:3000/RTU/SimCNV"+i+"/events/Z1_Changed/notifs",
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
	
				/*console.log("**************************************************");
				console.log("Z1 has been SUBSCRIBED FOR WORK STATION...... .");
				console.log(body);
				console.log("**************************************************");*/
			});

 	var move2_options = {
   "method": "POST",
   json: true, 
   body: {"destUrl":"http://localhost:"+PORT+"/move"},
   url: "http://localhost:3000/RTU/SimCNV"+i+"/events/Z2_Changed/notifs",
   headers: {
             "content-type": "application/json",
 			"cache-control": "no-cache"
         }
     };

 	request(move2_options, function (err, res, body) {
 				if (err) {
 				console.log('Error :', err);
 				return;
 				}
				
 				/*console.log("**************************************************");
 				console.log("Z2 has been SUBSCRIBED WORK STATION....... .");
 				console.log(body);
 				console.log("**************************************************");*/
 			});

 	var move3_options = {
   "method": "POST",
   json: true, 
   body: {"destUrl":"http://localhost:"+PORT+"/move"},
   url: "http://localhost:3000/RTU/SimCNV"+i+"/events/Z3_Changed/notifs",
   headers: {
             "content-type": "application/json",
 			"cache-control": "no-cache"
         }
     };

 	request(move3_options, function (err, res, body) {
 				if (err) {
 				console.log('Error :', err);
 				return;
 				}
 				/*console.log("**************************************************");
 				console.log("Z3 has been SUBSCRIBED WORK STATION....... .");
 				console.log(body);
 				console.log("**************************************************");*/
 			});

 	var move4_options = {
   "method": "POST",
   json: true, 
   body: {"destUrl":"http://localhost:"+PORT+"/move"},
   url: "http://localhost:3000/RTU/SimCNV"+i+"/events/Z4_Changed/notifs",
   headers: {
             "content-type": "application/json",
 			"cache-control": "no-cache"
         }
     };

 	request(move4_options, function (err, res, body) {
 				if (err) {
 				console.log('Error :', err);
 				return;
 				}
 				/*console.log("**************************************************");
 				console.log("Z4 has been SUBSCRIBED WORK STATION....... .");
 				console.log(body);
 				console.log("**************************************************");*/
 			});

   var move5_options = {
   "method": "POST",
   json: true, 
   body: {"destUrl":"http://localhost:"+PORT+"/move"},
   url: "http://localhost:3000/RTU/SimCNV"+i+"/events/Z5_Changed/notifs",
   headers: {
             "content-type": "application/json",
			"cache-control": "no-cache"
         }
     };

	request(move5_options, function (err, res, body) {
	 				if (err) {
 				console.log('Error :', err);
 				return;
 				}

 				/*console.log("**************************************************");
 				console.log("Z5 has been SUBSCRIBED WORK STATION....... .");
 				console.log(body);
 				console.log("**************************************************");*/
				
 			});


   var Pen_Changed_options = {
   "method": "POST",
   json: true, 
   body: {"destUrl":"http://localhost:"+PORT+"/work"},
   url: "http://localhost:3000/RTU/SimROB"+i+"/events/PenChanged/notifs",
  headers: {
             "content-type": "application/json",
 			"cache-control": "no-cache"

         }
     };

 	request(Pen_Changed_options, function (err, res, body) {
			
 				if (err) {
 				console.log('Error :', err);
 				return;
				}
 				/*console.log("**************************************************");
 				console.log("Pen_Changed_options has been SUBSCRIBED.");
 				console.log(body);
 				console.log("**************************************************");	*/		

				
 			});

   var Low_Ink_options = {
   "method": "POST",
   json: true, 
   body: {"destUrl":"http://localhost:"+PORT+"/work"},
   url: "http://localhost:3000/RTU/SimROB"+i+"/events/LowInkLevel/notifs",
   headers: {
             "content-type": "application/json",
 			"cache-control": "no-cache"

         }
     };

 	request(Low_Ink_options, function (err, res, body) {
			
 				if (err) {
 				console.log('Error :', err);
 				return;
 				}
 				/*console.log("**************************************************");
				console.log("Low_Ink_options has been SUBSCRIBED.");
 				console.log(body);
 				console.log("**************************************************");	*/		

				
 			});

 	var OutOf_Ink_options = {
   "method": "POST",
   json: true, 
   body: {"destUrl":"http://localhost:"+PORT+"/work"},
   url: "http://localhost:3000/RTU/SimROB"+i+"/events/OutOfInk/notifs",
   headers: {
             "content-type": "application/json",
 			"cache-control": "no-cache"

         }
     };

 	request(OutOf_Ink_options, function (err, res, body) {
			
 				if (err) {
 				console.log('Error :', err);
 				return;
 				}
 				/*console.log("**************************************************");
 				console.log("OutOf_Ink_options has been SUBSCRIBED.");
 				console.log(body);
 				console.log("**************************************************");*/			

				
 			});

   var sub_options = {
   "method": "POST",
   json: true,
  body: {"destUrl":"http://localhost:"+PORT+"/work"},
   url: "http://localhost:3000/RTU/SimROB"+i+"/events/DrawEndExecution/notifs",
   headers: {
             "content-type": "application/json",
 			"cache-control": "no-cache"
         }
     };

 	request(sub_options, function (err, res, body) {
 				if (err) {
 				console.log('Error :', err);
 				return;
 				}

 				/*console.log("**************************************************");
 				console.log("Draw End Executed for ROBOT: ");
 				console.log(body);
 				console.log("**************************************************");*/
				
 			});

 	}




   callback("HELLO SHAHBAZ....",'HELLO');

 }



 

