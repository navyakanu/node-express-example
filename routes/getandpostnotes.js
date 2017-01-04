var mongoOp  =  require('../model/mongo');  


// console.log(mongoOp.db);


// mongoOp.db.collection('counterschema').insert({_id:"fieldPositionID",sequence_value:0})





// function getNextSequenceValue(sequenceName){

//    var sequenceDocument = db.counters.findAndModify({
//       query:{_id: sequenceName },
//       update: {$inc:{sequence_value:1}},
//       new:true
//    });
    
//    return sequenceDocument.sequence_value;
// }


exports.getNoteDetails = 
		function(req,res){
        var response = {};

        mongoOp.db.collection('notes3').find({},{'__v': 0 }).sort([['fieldPositionID', 1]]).toArray(function (err, data){
             if(err) {
                response = {"error" : true,"success" : "Error fetching data"};
            } else {
                response = {"error" : null,"success" : data};
            }
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin','*');
            res.json(response);
        });
    
    }



 exports.addNoteDetails =
 		function(req,res){
 		
       		var db = new mongoOp();    
                                //how to initialise the payload directly to model instead of assigning each attribute?
        	var response = {};
				db.contentHeader = req.body.contentHeader; 
		        db.fieldPositionID =  req.body.finalPositionID ;    //generate unique id based on database key?? //validation if exists is pending
		        db.content = req.body.content;
		        db.status = req.body.status;
		                                                      
    
    	    db.save(function(err){
    
	            if(err) {
	                response = {"error" : true,"success" : "Error adding data"};
	            } else {
	                response = {"error" : null,"success" : "Data added"};
	            }
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin','*');
	            res.json(response);
	        });
}




exports.getSpecificNoteDetails =
    function(req,res){
        var response = {};
            mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"success" : "Error fetching data or no records found"};      
            } else {
                response = {"error" : null,"success" : data};
            }
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin','*');
            res.json(response);
        });
}

exports.updateSpecificNoteDetails =
  
          function(req,res){
                var response = {};
                mongoOp.findById(req.params.id,function(err,data){
                    if(err) {
                        response = {"error" : true,"success" : "Error fetching data"};
                    } else {
                        if(req.body.contentHeader !== undefined) {
                            data.contentHeader = req.body.contentHeader;
                        }
                        if(req.body.fieldPositionID !== undefined) {
                            data.fieldPositionID = req.body.fieldPositionID;
                        }
                         if(req.body.content !== undefined) {
                            data.content = req.body.content;
                        }
                        if(req.body.status !== undefined) {
                            data.status = req.body.status;
                        }
                        data.save(function(err){
                            if(err) {
                                response = {"error" : true,"success" : "Error updating data"};
                            } else {
                                response = {"error" : null,"success" : "Data is updated for "+req.params.id};
                            }
                            res.setHeader('Content-Type', 'application/json');
                            res.setHeader('Access-Control-Allow-Origin','*');
                            res.json(response);
                          
                        })
                    }
                });
}



exports.deleteSpecificNoteDetails =
        function(req,res){  
          var response = {};
            mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"success" : "Error fetching data"};
            } else {
                mongoOp.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"success" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"success" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Access-Control-Allow-Origin','*');
                    res.json(response);
                });
            }
        });
}








// }