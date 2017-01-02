var MongoClient = require('mongodb').MongoClient;


var dblocal;

var pr = MongoClient.connect('mongodb://localhost:27017/myProject');
console.log("yes :  "+dblocal);

pr.then(function(err, db){

	dblocal=db;
	console.log(dblocal);
	
	if (err) throw err;	
	db.collection('userdetailschemas').find().sort([['fieldID', 1]]).toArray(function (err, docs){
		if (err) throw err;
	});

	}
)

console.log(dblocal);







