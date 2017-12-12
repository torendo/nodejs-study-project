import express from 'express';
import assert from 'assert';
import mongoose from 'mongoose';

import config from '../config/index.json';
import citiesSchema from '../schemas/cities.schema';

const server = express();

mongoose.connect(config.dbUrl, {
  useMongoClient: true,
  promiseLibrary: global.Promise
}, function (err) {
  assert.equal(err, null);
});

server.use('/', function (req, res) {
  const City = mongoose.model('city', citiesSchema);
  City.aggregate({ $sample: { size: 1 } }, function (err, document) {
    assert.equal(err, null);
    if (document.length) {
      res.status(200).send(document);
    } else {
      res.status(404).send({ message: "City not Found" });
    }
  });
});
server.listen(3000, () => console.log('Server listening on port 3000'));