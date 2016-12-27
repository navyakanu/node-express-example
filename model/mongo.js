var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/myProject');


var mongoSchema = mongoose.Schema;


var userSchema =  new mongoSchema({
	"userName" : String,
	"fieldID" : String,
	"content" : String,
	"status" : Boolean
});


module.exports = mongoose.model('userDetailSchema',userSchema);


