var app = require('../../server'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  userFactory = require('../factories').user;

// Globals
var user;

describe('Auth api', function () {
  "use strict";

  beforeEach(function (done) {
    user = new User(userFactory);
    user.save(done);
  });

  afterEach(function (done) {
    // Clear database.
    mongoose.connection.db.dropDatabase(done);
  });

  describe('login route', function () {
    it('should fail for invalid user', function (done) {
      request(app).post('/api/auth/login')
        .send({ email: 'fake@fake.com', password: userFactory.password })
        .expect(401, { message: 'User not found' }, done);
    });

    it('should fail for invalid password', function (done) {
      request(app).post('/api/auth/login')
        .send({ email: userFactory.email, password: '' })
        .expect(400, { message: 'Invalid password' }, done);
    });

    it('should log the user in', function (done) {
      request(app).post('/api/auth/login')
        .send(userFactory)
        .expect(200, done);
    });

  });

  describe('Signup route', function () {
    describe('incoplete param', function () {
      it('should fail without a name', function (done) {
        request(app).post('/api/auth/signup')
          .send({
            email: userFactory.email,
            password: userFactory.password
          })
          .expect(400, { message: 'Incomplete parameters. User\'s name, email and password are required.' }, done);
      });

      it('should fail without a email', function (done) {
        request(app).post('/api/auth/signup')
          .send({
            name: userFactory.name,
            password: userFactory.password
          })
          .expect(400, { message: 'Incomplete parameters. User\'s name, email and password are required.' }, done);
      });

      it('should fail without a password', function (done) {
        request(app).post('/api/auth/signup')
          .send({
            email: userFactory.email,
            name: userFactory.name
          })
          .expect(400, { message: 'Incomplete parameters. User\'s name, email and password are required.' }, done);
      });
    });

    it('should not create user thet exists.', function (done) {
      request(app).post('/api/auth/signup')
        .send(userFactory)
        .expect(409, { message: 'User already exist.' }, done);
    });

    it('should signup successfully', function (done) {
      // delete existing user.
      user.remove();
      request(app).post('/api/auth/signup')
        .send(userFactory)
        .expect(200, done);
    });
  });
});
