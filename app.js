var express     =   require('express');
var app         =   express();
var bodyParser  =   require('body-parser');
var mongoOp     =   require('./model/mongo');
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});




//************************************/users --GET & POST with the same route*****************************************

router.route("/users")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
        // Mongo command to fetch all data from collection.
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
 

        db.userName = req.body.userName; 
        db.fieldID =  req.body.fieldID;                //generate unique id based on database key?? //validation if exists is pending
        db.content = req.body.content;
        db.status = req.body.status;
                                                       // save() will run insert() command of MongoDB.
    
        db.save(function(err){
    
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });



//*********************/users/:id for search GET /PUT(IF ALREADY DOES NOT EXIST ADDS)/ DELETE ***********************************************************

router.route("/users/:id")
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
                if(req.body.userName !== undefined) {
                    data.userName = req.body.userName;
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















