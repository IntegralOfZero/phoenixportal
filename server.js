var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Babel ES6/JSX Compiler
require('babel-register');


var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');

var app = express();

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'public/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/:id/zero', function(req, res) {
	res.send('Hello World, Zero. ID is ' + req.params.id);
});

app.use('/', function(req, res) {
	res.render('index');
});

var port = process.env.PORT || 3000;
app.listen(port);
