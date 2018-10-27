const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints:['127.0.0.1:9042'], 
                  keyspace: 'demo' });
const router = express.Router();
router.use(bodyParser.json());


router.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, (req, res, next) => {
  const query = 'select * from coins where id = ?';
  client.execute(query, [ '1' ])
    .then((result) => {
      if(result.rows.length === 0) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('NOT FOUND');
        return 
      }
      console.log('res', result.rows[0]);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(result.rows[0]);
    });
})
.put(cors.cors, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('PUT operation not supported');
})
.post(cors.cors, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('POST operation not supported');
})
.delete(cors.cors, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('DELETE operation not supported');
})

router.route('/:id')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, (req, res, next) => {
  const query = 'select * from coins where id = ?';
  client.execute(query, [ req.params.id ])
    .then((result) => {
      if(result.rows.length === 0) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('NOT FOUND');
        return 
      }
      console.log('res', result.rows[0]);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(result.rows[0]);
    });
})
.put(cors.cors, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('PUT operation not supported');
})
.post(cors.cors, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('POST operation not supported');
})
.delete(cors.cors, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('DELETE operation not supported');
})

module.exports = router;