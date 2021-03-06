var express     =   require('express');
var app         =   express();
var bodyParser  =   require('body-parser');
var router      =   express.Router();
var path = require('path');

var createtodo = require('./routes/getandpostnotes')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use(express.static(path.join(__dirname + '/public')));


module.exports =app



//**************************************************Render static file with the call***************************************************

router.route("/").get(function(req,res){
    res.sendFile( __dirname + "/public/html/" + "index.html" );  
});


router.route("/todo").get(function(req,res){
    res.sendFile(path.join(__dirname, '/public/html', 'todo.html'));
});


router.route("/todolist").get(function(req,res){
   res.sendFile('todoagain.html', { root: path.join(__dirname, 'public/html') });
});



//************************************/notes --GET & POST with the same route*********************************************************


app.get('/notes',createtodo.getNoteDetails);
app.get('/notes/:fieldPositionID',createtodo.getSpecificNoteDetails)


app.post('/notes',createtodo.addNoteDetails);


//*********************/notes/:id for search GET /PUT (UPDATE) /DELETE ******************************************************************

app.put('/notes/:fieldPositionID',createtodo.updateSpecificNoteDetails)
app.delete('/notes/:fieldPositionID',createtodo.deleteSpecificNoteDetails)

  

 //********************************/notes/:id for getting the status of the target
 
 app.get('/notes/status/:fieldPositionID',createtodo.getNoteStatus) 
 app.get('/notes/isTargetDay/:fieldPositionID',createtodo.getNoteStatusIfTargetDateISToday) 


app.listen(3000);
console.log("Listening to PORT 3000");















