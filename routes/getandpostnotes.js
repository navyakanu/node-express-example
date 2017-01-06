var mongoOp  =  require('../model/mongo');  



exports.getNoteDetails = 
        function(req,res){
        var response = {};
        
        //Need to find a way to use "find" with mongoose and not access table directly
        mongoOp.db.collection('notes3').find({},{'_id': 0 ,'createdTimeStamp':0}).sort([['fieldPositionID', 1]]).toArray(function (err, data){
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
        
            var dbpost = new mongoOp();   
             //Need to find a way to use "find" with mongoose and not access table directly
             mongoOp.db.collection('notes3').find({}).sort([['fieldPositionID', -1]]).toArray(function (err, data){
             if(err) {
                var value = {"error" : true,"success" : "Error fetching data"};
            } else {
            
            if(Object.keys(data).length !== 0) {                        //Any better ways??
                var value = parseInt(data[0].fieldPositionID)
            }
            else {
               var value = 0;
            }

                var response = {};
                dbpost.contentHeader = req.body.contentHeader;  //how to initialise the payload directly to model instead of assigning each attribute
                dbpost.fieldPositionID =   parseInt(value)+1;    
                dbpost.content = req.body.content;
                dbpost.status = req.body.status;
                dbpost.targetDate = req.body.targetDate;
                dbpost.createdTimeStamp = new Date().toISOString();
                                                              
    
            dbpost.save(function(err){
    
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
});

                   
}



exports.getSpecificNoteDetails =
    function(req,res){
        var response = {};
            mongoOp.findOne({'fieldPositionID':req.params.fieldPositionID},{'_id':0,'createdTimeStamp':0},function(err,data){
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
               
                mongoOp.findOneAndUpdate({'fieldPositionID':parseInt(req.params.fieldPositionID)},
                    {$set: {'content':req.body.content,'contentHeader':req.body.contentHeader,'status':req.body.status,'targetDate':req.body.targetDate}},function(err,data){
                    if(err) {
                        response = {"error" : true,"success" : "Error fetching data"};
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
                    
                });
}



exports.deleteSpecificNoteDetails =
        function(req,res){  
          var response = {};
          
              
                mongoOp.findOneAndRemove({'fieldPositionID': parseInt(req.params.fieldPositionID)},function(err){
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








// }