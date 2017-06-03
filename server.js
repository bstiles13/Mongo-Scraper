var express = require('express');
var exphbs = require('express-handlebars');
var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');

var db = mongojs('scraper', ['articles'])
var app = express();

app.listen(3000, function() {
    console.log('Server connected on port 3000');
})

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static('views'));

app.get('/', function(req, res) {
    res.render('index', {})
})

app.get('/scrape', function(req, res) {
    request('http://www.bbc.com/earth/world', function(error, response, html) {
        // console.log(html);
        var $ = cheerio.load(html);
        $('.promo-unit').each(function(i, element) {
            // console.log(element);
            console.log($(this).find('.promo-unit-summary').html());
        })
    })
})
