var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/myProject', function(err, db){
	
	if (err) throw err;

	
	db.collection('userdetailschemas').find().sort([['fieldID', 1]]).toArray(function (err, docs){
		if (err) throw err;
		console.log(docs);

	});




});