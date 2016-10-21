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
    user.save(function () {
      done();
    });
  });

  describe('login route', function () {
    it('should fail for invalid user', function (done) {
      request(app).post('/api/auth/login')
        .send({ email: 'fake@fake.com', password: userFactory.password })
        .expect(401, done);
    });

    it('should fail for invalid password', function (done) {
      request(app).post('/api/auth/login')
        .send({ email: userFactory.email, password: '' })
        .expect(401, done);
    });

    it('should log the user in', function (done) {
      request(app).post('/api/auth/login')
        .send({ email: userFactory.email, password: userFactory.password })
        .expect(200, done);
    });

  });
});
