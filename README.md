# node-express-mongo- practice  



1) Trying out building api calls
2) Trying out mongo db with reference to their original website
3) Reference : https://codeforgeek.com/2015/08/restful-api-node-mongodb/ (Implementation based on the blog)

Sample request for post:


Installation Steps:

1) npm install

2) create data directory 
	mkdir data

3) start mongodb server and mention the dbpath as data 

	mongod --dbpath=data

4) npm start



API Calls:


1) localhost:3000/notes -- GET/POST

PAYLOAD
{
    "title" : "Javascript",
    "fieldID" : "1234",
    "content": "Callback functions",
    "status" : true
}


2) localhost:3000/notes:id 

To get the existing userid login to mongoshell in a new terminal

1) mongo
2) use myProject
3) show tables
4) db.notedetails.find()


select one of the ids from the document and add in the api call (POST atleast one entry from api call /users before selecting) 








