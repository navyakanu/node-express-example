var mongoOp  =  require('../model/mongo');  



exports.getNoteDetails = 
		function(req,res){
        var response = {};

        mongoOp.db.collection('notes').find().sort([['fieldID', 1]]).toArray(function (err, data){
             if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    
    }



 exports.addNoteDetails =
 		function(req,res){
 		
       		var db = new mongoOp();    
                                //how to initialise the payload directly to model instead of assigning each attribute?
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
}




exports.getSpecificNoteDetails =
    function(req,res){
        var response = {};
            mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data or no records found"};      
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
}

exports.updateSpecificNoteDetails =
  
          function(req,res){
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
}



exports.deleteSpecificNoteDetails =
        function(req,res){  
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
}






// }