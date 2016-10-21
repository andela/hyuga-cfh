/**
 * Module dependencies.
 */
require('../../server');

var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    userFactory = require('../factories').user;

//Globals
var user;

//The tests
describe('<Unit Test>', function () {
    "use strict";
    
    describe('Model User:', function () {
        before(function (done) {
            user = new User(userFactory);
            done();
        });

        describe('Method Save', function () {
            it('should be able to save whithout problems', function (done) {
                return user.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save witout name', function (done) {
                user.name = '';
                return user.save(function (err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function (done) {
            done();
        });
    });
});