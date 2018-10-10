const express = require('express');
const bodyParser = require('body-parser');

const FavoriteCoin = require('../models/favoriteCoin');
const authenticate = require('../authenticate');
const cors = require('./cors');

const FavoriteCoinRouter = express.Router();
FavoriteCoinRouter.use(bodyParser.json());

FavoriteCoinRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, (req, res, next) => {
    FavoriteCoin.find(req.query)
      .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.cors, (req, res, next) => {
    FavoriteCoin.create(req.body)
    .then((favorites)=>{
      console.log('Favorite Created ', favorites);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
  })
  .put(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/');
  })
  .delete((req, res, next) => {
    FavoriteCoin.remove({})
    .then((resp) =>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err))
  });


  FavoriteCoinRouter.route('/:favoriteId')
  .options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
  .get(cors.cors, (req, res, next) => {
    FavoriteCoin.findById(req.params.favoriteId)
      .then((favorite) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /favorites/:favoriteId');
  })
  .put(cors.cors, (req, res, next) => {
    FavoriteCoin.findByIdAndUpdate(req.params.favoriteId, {$set: req.body}, {new: true})
      .then((favorite) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    FavoriteCoin.findByIdAndRemove(req.params.favoriteId)
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
  });

  module.exports = FavoriteCoinRouter;