const chai = require('chai')
const chaiHttp = require('chai-http')
const {app} = require('../app')
chai.use(chaiHttp)
chai.should();

// test
describe('Users tests', () => {
  it('should list ALL users on /v1/users GET', (done) => {
    chai.request(app)
    .get('/v1/users')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    })
  })

  it('should list a SINGLE user on /v1/users/<id> GET', (done) => {
    chai.request(app)
    .get('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done()
    })
  })

  it('should add a SINGLE user on /v1/users POST', (done) => {
    chai.request(app)
    .post('/v1/users')
    .send(    
    {
      name: 'test_name',
      login: 'test_login',
      age: 10
    })
    .end((err, res) => {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.have.property('id');
      res.body.should.have.property('name');
      res.body.name.should.equal('test_name');
      res.body.should.have.property('login');
      res.body.login.should.equal('test_login')
      res.body.should.have.property('age');
      res.body.age.should.equal(10);
      done();
    })
  })

  it('should update a SINGLE user on /v1/users/<id> PATCH', (done) => {
    chai.request(app)
    .patch('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
    .send(    {
      name: 'patch_name',
      login: 'patch_log',
      age: 30
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('id');
      res.body.should.have.property('name');
      res.body.name.should.equal('patch_name');
      res.body.should.have.property('login');
      res.body.login.should.equal('patch_log')
      res.body.should.have.property('age');
      res.body.age.should.equal(30);
      done();
    })
  })

  it('should delete a SINGLE user on /v1/users/<id> DELETE', (done) => {
    chai.request(app)
    .delete('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
    .end((err, response) => {
      response.should.have.status(200);
        chai.request(app)
        .get('/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e')
        .end((err, res) => {
          res.should.status(404)
          done()
        })
    })
  })

})