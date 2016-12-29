var express = require('express');

var hbs     = require('hbs'),
    serve   = require('serve-static');

var app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);

console.log(__dirname);
app.use('/assets', express.static('./../assets'));
app.use('/fonts', express.static('../fonts'));

app.set('views', __dirname + '/../views');

app.get('/', function (req, res) {
    res.render('index.html');
});



var data = require('../test/data.js');

app.get('/organizations', function (req, res) {
    res.json(data);
});


app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
