import assert from 'assert';
import mongoose from 'mongoose';

import config from '../config/index.json';
import cities from './cities.json';
import users from './users.json';
import products from './products.json';
import citiesSchema from '../schemas/cities.schema';
import usersSchema from '../schemas/users.schema';
import productsSchema from '../schemas/products.schema';

mongoose.connect(config.dbUrl, {
  useMongoClient: true,
  promiseLibrary: global.Promise
}, function (err) {
  assert.equal(err, null);
  const City = mongoose.model('city', citiesSchema);
  const User = mongoose.model('user', usersSchema);
  const Product = mongoose.model('product', productsSchema);
  Promise.all([
    City.create(cities.slice(5,10)).then(() => {
      console.log('Inserted second 5 documents in Cities collection by mongoose');
    }),
    User.create(users).then(() => {
      console.log('Inserted all documents in Users collection by mongoose');
    }),
    Product.create(products).then(() => {
      console.log('Inserted all documents in Products collection by mongoose');
    })
  ]).then(() => {
    console.log('Seeding has been finished successfully');
    mongoose.disconnect();
  }).catch((err) => {
    throw Error(err);
  });
});