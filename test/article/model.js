/**
 * Module dependencies.
 */
require('../../server');

var should = require('should'),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    articleFactory = require('../factories').article;

//Globals
var article;

//The tests
describe('<Unit Test>', function() {
    "use strict";

    describe('Model Article:', function() {
        beforeEach(function(done) {
            article = new Article(articleFactory);
            article.save(done);
        });

        describe('Method Save', function() {
            it('should be able to save whithout problems', function(done) {
                article.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                article.title = '';

                article.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });


        after(function(done) {
            done();
        });
    });
});