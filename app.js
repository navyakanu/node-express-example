var express = require('express')
var app = express()



app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/create',function(req,res){
	res.send("User created");
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)

})


app.get('/students/:studentId/books/:bookId', function (req, res, next) {
  var stuId = req.params.studentId
  var bookId = req.params.bookId
  console.log(stuId);
  next()
}, function (req, res) {
  res.send(req.params)
})







