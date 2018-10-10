const express = require('express');
const bodyParser = require('body-parser');

const Favorites = require('../models/favorite');
const authenticate = require('../authenticate');
var jwt = require('jsonwebtoken');
const cors = require('./cors');

var util = require('util');

const FavoriteRouter = express.Router();
FavoriteRouter.use(bodyParser.json());

var getUserId = (req) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = authenticate.getUser(token);
    return decoded._id;
  } else {
    return null;
  }
}

FavoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, (req, res, next) => {
  const userId = getUserId(req);
  Favorites.findOne({user: userId})
  .exec((err, favorite) => {
    if(err) return next(err);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(favorite);
  });
})
.post(cors.corsWithOptions, (req, res, next) => {
  const userId = getUserId(req);
  Favorites.findOne({user : userId}, (err, favorite) => {
    if(err) return err;
    if(!favorite){
      Favorites.create({user: userId})
      .then((favorite) => {
        for(var i = 0; i < req.body.length; i++){
          if(favorite.coinKeys.indexOf(req.body[i]._id) < 0){
            favorite.coinKeys.push(req.body[i]);
          }
        }
        favorite.save()
        .then((favorite) => {
          console.log("Favorite created!");
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorite);
        }).catch((err) => next(err));
      }).catch((err) => next(err));
    } else{
      for(var i = 0; i < req.body.length; i++){
        if(favorite.coinKeys.indexOf(req.body[i].coinKey) < 0){
          favorite.coinKeys.push(req.body[i].coinKey);
        }
      }
      favorite.save()
      .then((favorite) => {
        console.log("Favorite created!");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      }).catch((err) => next(err));
    }
  });
})
.put(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('PUT operation not supported on /favorites/');
})
.delete(cors.corsWithOptions, (req, res, next) => {
  const userId = getUserId(req);
  Favorites.findOneAndRemove({ user: userId }, (err, resp) => {
    if(err) return next(err);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  });
});


FavoriteRouter.route('/:coinKey')
  .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    const userId = getUserId(req);
    Favorites.findOne({ user : userId})
    .then((favorites) => {
      if(!favorites){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json');
        return res.json({"exists" : false, "favorites" : favorites});
      } else{
        if(favorites.coinKeys.indexOf(req.params.coinKey) < 0){
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application-json');
          return res.json({"exists" : false, "favorites" : favorites});
        } else{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application-json');
          return res.json({"exists" : true, "favorites" : favorites});
        }
      }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
  const userId = getUserId(req);
  Favorites.findOne({ user : userId}, (err, favorite) => {
    if(err) return next(err);
    if(!favorite) {
      Favorites.create({ user: userId })
      .then((favorite) => {
        favorite.coinKeys.push(req.params.coinKey)
        favorite.save()
        .then((favorite) => {
          console.log("Favorite created!");
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorite);
        }).catch((err) => next(err));
    }).catch((err) => next(err));
  } else{
    if(favorite.coinKeys.indexOf(req.params.coinKey) < 0){
      favorite.coinKeys.push(req.params.coinKey);
      favorite.save()
      .then((favorite) => {
        console.log("Favorite Coin Added!");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      }).catch((err) => next(err));
    } else{
      res.statusCode = 403;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Coin ' + req.params.coinKey + 'already exists');
      }
    }
  });
})
.put(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('PUT operation not supported on /favorites/:coinKey');
})
.delete(cors.corsWithOptions, (req, res, next) => {
  const userId = getUserId(req);
  Favorites.findOne({ user : userId}, (err , favorite) => {
    if(err) return next(err);
    var index = favorite.coinKeys.indexOf(req.params.coinKey);
    if(index >= 0){
      console.log('before favorite = ' + JSON.stringify(favorite.coinKeys));
      favorite.coinKeys.splice(index, 1);
      console.log('after favorite = ' + JSON.stringify(favorite.coinKeys));
      favorite.save()
      .then((favorite) => {
        console.log("Favorite Coin Deleted!");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      }).catch((err) => next(err));
    } else{
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Coin ' + req.params._id + 'not yours');
    }
  });
});

module.exports = FavoriteRouter;