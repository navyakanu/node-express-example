var mongoose =require('mongoose');

var mongoDBUrl = 'mongodb://localhost:27017/myProject'

mongoose.connect(mongoDBUrl,function (err, db) {

  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);

  } else {
    console.log('Connection established to', mongoDBUrl);
    }
}
);




var mongoSchema = mongoose.Schema;


var notesSchema =  new mongoSchema({
    "contentHeader" : String,
    "fieldPositionID" : String,
    "content" : String,
    "status" : Boolean,
    "createdTimeStamp": Date,
    "targetDate" : Date

},{ versionKey: false });





module.exports = mongoose.model('notes3',notesSchema);




