/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

ArticleSchema.path('title').validate(function(title) {
    // if you are authenticating by any of the oauth strategies, don't validate
    return title.length > 1;
}, 'Title cannot be blank');


mongoose.model('Article', ArticleSchema);
