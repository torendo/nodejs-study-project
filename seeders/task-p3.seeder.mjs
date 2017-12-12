import assert from 'assert';
import mongo from 'mongodb';
const MongoClient = mongo.MongoClient;

import config from '../config/index.json';
import cities from './cities.json';

MongoClient.connect(config.dbUrl, function (err, db) {
  assert.equal(err, null);
  db.collection('cities').insertMany(cities.slice(0,5), function (err, res) {
    assert.equal(err, null);
    console.log('Inserted first 5 documents in Cities collection by mongo driver directly');
    db.close();
  });
});