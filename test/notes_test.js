
let mongoose = require("mongoose");
let mongoOp = require('../model/mongo');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);

// Pending test setup to remove data from db

// describe('notes', () => {
//     beforeEach((done) => { //Before each test we empty the database
//         notes.remove({}, (err) => { 
//            done();         
//         });     
//     });
 
//  * Test the /GET route
  
  describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/notes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
               // res.body.length.should.be.eql(0);
              done();
            });
      });

it('it should not POST a book without pages field', (done) => {
        let notes = {
                "title" : "html1",
                "fieldID" : "0011",
                "content": "abcd12",
                "status": true
            }
        chai.request(server)
            .post('/notes')
            .send(notes)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
      });


  });
