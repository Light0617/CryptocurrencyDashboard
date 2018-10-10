const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var passport = require('passport');
const config = require('./config');

const userRouter = require('./routes/userRouter');
const favoriteRouter = require('./routes/favoriteRouter');

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

app.use('/users', userRouter);
app.use('/favorites', favoriteRouter);


app.get('*', (req, res) => {
  res.end('hello world');
});

app.listen(3003, () => {
  console.log('Example app listening on port 3003!')
})