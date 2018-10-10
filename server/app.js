const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var passport = require('passport');
var authenticate = require('./authenticate');

const config = require('./config');

const app = express();

const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.end('hello world');
});


app.get('*', (req, res) => {
  res.end('hello world');
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!')
})