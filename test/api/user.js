var app = require('../../server'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

// Globals
var user;

describe('Auth api', function () {
  "use strict";

  beforeEach(function (done) {
    user = new User({
      name: 'Full name',
      email: 'test@test.com',
      username: 'user',
      password: 'password'
    });

    user.save(function () {
      done();
    });
  });

  describe('login route', function () {
    it('should fail for invalid user', function (done) {
      request(app).post('/api/auth/login')
        .send({ email: 'fake@fake.com', password: 'password' })
        .expect(401, done);
    });

    it('should fail for invalid password', function (done) {
      request(app).post('/api/auth/login')
        .send({ email: 'test@test.com', password: '' })
        .expect(401, done);
    });

    it('should log the user in', function (done) {
      request(app).post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(200, done);
    });

  });
});
