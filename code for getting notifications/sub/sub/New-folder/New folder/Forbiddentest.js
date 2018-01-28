var http = require('http');
var request = require('request'); 
var url = require("url"); 
 
 var myServer = http.createServer(function(req, res)
    {
        var method = req.method;
		var parseUrl = url.parse(req.url,true);
		var pathname = parseUrl.pathname;
		
		console.log(pathname);
		
		//console.log(req);
       // console.log("Method: " + method);
        if(method == 'GET')
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json' );
            res.end('Agent is running.');
        }
        else if(method == 'POST') 
        {
          
            var body = "";
			var objects;
				
				if(pathname=="/"){
					console.log("HELLO...............");
					console.log(req.body);
				}

				
            req.on('data', function (chunk)
            {
				body += chunk;
                objects=JSON.parse(body);	
				/*
				if(objects.senderID == "SimCNV8"){
					console.log("**********************************");
					console.log(objects);
					console.log("**********************************");
				}
				else{
					console.log("----------------------------------");
					console.log(objects);
					console.log("----------------------------------");
				}
				*/
				if(pathname=="/getPalletInfo"){
					
					sendRequest(objects);
				}
				
				if(pathname=="/"){
					console.log("HELLO...............");
				}
				
				
            });
        req.on('end', function (){})
        res.end('OK');
        }
    });
	
    myServer.listen(2999, "localhost", () =>
    {
        console.log('Agent server Running......' );
		
		
    });
	
function sendRequest(urlToExecute){
	
			var myUrl = urlToExecute.destUrl;
			
		    var options =
			{
				method: 'post',
				json: true,
				body: {"destUrl":"http://localhost:2999/palltedID"}, 
				url: myUrl, 
				headers:
					{
						"content-type": "application/json",
						"cache-control": "no-cache"
					}
			};
			
		request(options, function (err, res, body) 
		{
			if (err)
			{
				console.log('Error :', err);
				return reject(false);
			}
			else{
				console.log("---------- BODY -----------");
				console.log(body);
				console.log("---------- BODY -----------");
			}
			
		});		
		
		
}	
	
	
	