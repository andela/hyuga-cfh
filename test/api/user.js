var app = require('../../server'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

// Globals
var user,
  userObject = {
    name: 'Full name',
    email: 'test@test.com',
    username: 'user',
    password: 'password'
  };

describe('Auth api', function () {
  "use strict";

  beforeEach(function (done) {
    user = new User(userObject);
    user.save(done);
  });

  afterEach(function (done) {
    // Clear database.
    mongoose.connection.db.dropDatabase(done);
  });

  describe('login route', function () {
    it('should fail for invalid user', function (done) {
      request(app).post('/api/auth/login')
        .send({
          email: 'fake@fake.com',
          password: userObject.password
        })
        .expect(404, {
          message: 'User not found'
        }, done);
    });

    it('should fail for invalid password', function (done) {
      request(app).post('/api/auth/login')
        .send({
          email: userObject.email,
          password: ''
        })
        .expect(400, {
          message: 'Invalid password'
        }, done);
    });

    it('should log the user in', function (done) {
      request(app).post('/api/auth/login')
        .send({
          email: userObject.email,
          password: userObject.password
        })
        .expect(200, done);
    });

  });

  describe('Signup route', function () {
    describe('incoplete param', function () {
      it('should fail without a name', function (done) {
        request(app).post('/api/auth/signup')
          .send({
            email: userObject.email,
            password: userObject.password
          })
          .expect(400, {
            message: 'Incomplete params.'
          }, done);
      });

      it('should fail without a email', function (done) {
        request(app).post('/api/auth/signup')
          .send({
            name: userObject.name,
            password: userObject.password
          })
          .expect(400, {
            message: 'Incomplete params.'
          }, done);
      });

      it('should fail without a password', function (done) {
        request(app).post('/api/auth/signup')
          .send({
            email: userObject.email,
            name: userObject.name
          })
          .expect(400, {
            message: 'Incomplete params.'
          }, done);
      });
    });

    it('should not create user thet exists.', function (done) {
      request(app).post('/api/auth/signup')
        .send(userObject)
        .expect(409, {
          message: 'User already exist.'
        }, done);
    });

    it('should signup successfully', function (done) {
      // delete existing user.
      user.remove();
      request(app).post('/api/auth/signup')
        .send(userObject)
        .expect(200, done);
    });
  });
});