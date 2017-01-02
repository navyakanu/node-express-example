var express     =   require('express');
var app         =   express();
var bodyParser  =   require('body-parser');
var mongoOp     =   require('./model/mongo');   //mongoOp 
var router      =   express.Router();
var path = require('path');



app.use(express.static(path.join(__dirname + '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));



//---- Render static file with the call

router.route("/").get(function(req,res){
    res.sendFile( __dirname + "/public/html/" + "index.html" );  
});


router.route("/todo").get(function(req,res){
    res.sendFile(path.join(__dirname, '/public/html', 'todo.html'));
});


router.route("/todolist").get(function(req,res){
   res.sendFile('todoagain.html', { root: path.join(__dirname, 'public/html') });
});



//************************************/notes --GET & POST with the same route*****************************************

router.route("/notes")
    .get(function(req,res){
        var response = {};

        mongoOp.db.collection('notedetails').find().sort([['fieldID', 1]]).toArray(function (err, data){
             if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    
    })
    .post(function(req,res){
        var db = new mongoOp();                        //how to initialise the payload directly to model instead of assigning each attribute?
        var response = {};
 

        db.title = req.body.title; 
        db.fieldID =  req.body.fieldID;                //generate unique id based on database key?? //validation if exists is pending
        db.content = req.body.content;
        db.status = req.body.status;
                                                      
    
        db.save(function(err){
    
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });



//*********************/notes/:id for search GET /PUT (UPDATE) /DELETE ***********************************************************

router.route("/notes/:id")
    .get(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data or no records found"};      
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .put(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.title !== undefined) {
                    data.title = req.body.title;
                }
                if(req.body.fieldID !== undefined) {
                    data.fieldID = req.body.fieldID;
                }
                 if(req.body.content !== undefined) {
                    data.content = req.body.content;
                }
                if(req.body.status !== undefined) {
                    data.status = req.body.status;
                }
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                mongoOp.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })    




app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");















