import express from 'express';
import assert from 'assert';
import mongo from 'mongodb';

import config from '../config/index.json';

const server = express();
const MongoClient = mongo.MongoClient;
let mongodb;

MongoClient.connect(config.dbUrl, function (err, db) {
  assert.equal(err, null);
  mongodb = db;
});

server.use('/', function (req, res) {
  mongodb.collection('cities').aggregate({ $sample: { size: 1 } }, function (err, document) {
    assert.equal(err, null);
    if (document.length) {
      res.status(200).send(document);
    } else {
      res.status(404).send({ message: "City not Found" });
    }
  });
});
server.listen(3000, () => console.log('Server listening on port 3000'));