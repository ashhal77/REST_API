var ObjectID = require('mongodb').ObjectID;



  module.exports = function(app, db) {

  //read route
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

//adnan
app.set('port',8080);


//adnan


//send route
app.post('/notes', (req, res) => {
	console.log("the post request input is------------------------------:", req.body);
	//console.log("the request is------------------------------:",req.body);
	//console.log(req);
	//console.log(res);
    //const note = { text: req.body.body, title: req.body.title };
    //console.log(req.body.id);

    //const note = { text: req.body.id, title: req.body.title };
    //console.log(req.body);
    //if (req.body === undefined || req.body === null) {
    if(Object.keys(req.body).length === 0 && req.body.constructor === Object){
        console.log(" Fields are empty, enter the additional data.");
        res.send(" Fields are empty madarchod");
    }

    else {

	    	const note = req.body;
	        db.collection('notes').insert(note, (err, result) => {
			      if (err) { 
			        res.send({ 'error': 'An error has occurred' }); 
			        } else {
			        res.send(result.ops[0]);
			      }
			     });


    }
    

    
  });


//delete route

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });


  //update route
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
};