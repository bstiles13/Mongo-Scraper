var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    image: {
        type: String
    },
    title: {
        type: String,
        index: {
            unique: true
        }
    },
    text: {
        type: String
    },
    comments: [{
        type: String
    }],
    favorite: {
        type: Boolean,
        default: false
    }
})

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
