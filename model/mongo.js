var mongoose =require('mongoose');

var mongoDBUrl = 'mongodb://localhost:27017/myProject'


mongoose.connect(mongoDBUrl,function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', mongoDBUrl);
	}
}
);


var mongoSchema = mongoose.Schema;


var userSchema =  new mongoSchema({
	"userName" : String,
	"fieldID" : String,
	"content" : String,
	"status" : Boolean
});



module.exports = mongoose.model('userdetailschemas',userSchema);


