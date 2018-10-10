const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var passport = require('passport');
var authenticate = require('./authenticate');

const config = require('./config');

const natureRouter = require('./routes/natureRouter');
const natureCommentRouter = require('./routes/natureCommentRouter');
const userRouter = require('./routes/userRouter');
const favoriteRouter = require('./routes/favoriteRouter');
const profileRouter = require('./routes/profileRouter')

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

app.use('/natures', natureRouter);
app.use('/comments', natureCommentRouter);
app.use('/users', userRouter);
app.use('/favorites', favoriteRouter);
app.use('/profile', profileRouter);

app.get('*', (req, res) => {
  res.end('hello world');
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!')
})