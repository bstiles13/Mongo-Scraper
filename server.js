var express = require('express');
var exphbs = require('express-handlebars');
var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

var Article = require('./models/Article.js');

mongoose.connect("mongodb://localhost/articles_db");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static('views'));

app.get('/', function(req, res) {
    Article.find({}, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            // console.log(data);
            res.render('index', {Article: data})
        }
    })
})

app.get('/scrape', function(req, res) {
    request('http://www.bbc.com/earth/world', function(error, response, html) {
        // console.log(html);
        var $ = cheerio.load(html);
        $('.promo-unit').each(function(i, element) {
            // console.log(element);
            var image = $(this).find('.replace-image').attr('href');
            var title = $(this).find('.promo-unit-title').html();
            var text = $(this).find('.promo-unit-summary').html();
            // console.log(image);
            // console.log(title);
            // console.log(text + '\n');
            var newArticle = new Article({image: image, title: title, text: text});
            newArticle.save(function(err, object) {
                if (err) return console.error(err);
                // console.log(object);
            })
        })
        res.send('complete');
    })
})

app.get('/favorites', function(req, res) {
    Article.find({favorite: true}, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.render('favorites', {Article: data});
        }
    })
})

app.post('/favorites/:id', function(req, res) {
    var id = req.params.id;
    Article.findByIdAndUpdate(id, { $set: { favorite: true }}, {}, function (err, status) {
        if (err) return handleError(err);
        res.send('success');
});
})

app.post('/remove/:id', function(req, res) {
    var id = req.params.id;
    Article.findByIdAndUpdate(id, { $set: { favorite: false }}, {}, function (err, status) {
        if (err) return handleError(err);
        res.send('success');
});
})

app.get('/comments/:id', function(req, res) {
    var id = req.params.id;
    // console.log(id);
    Article.findById(id, function(error, data) {
        // console.log(data);
        res.json(data);
    })
})

app.post('/comments/:id', function(req, res) {
    var id = req.params.id;
    var comment = req.body.comment;
    // console.log(id);
    // console.log(comment);
    Article.findByIdAndUpdate(id, { $push: { comments: comment }}, {}, function (err, data) {
  if (err) return handleError(err);
    Article.findById(id, function(error, comments) {
        if (error) {
            res.send(error);
        } else {
            res.send(comments);
        }
    })
});
})

app.listen(3000, function() {
    console.log('Server connected on port 3000');
})
