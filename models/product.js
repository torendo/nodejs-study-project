import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import productsSchema from '../schemas/products.schema';
const Product = mongoose.model('product', productsSchema);

export default {
  getAll() {
    return Product.find({}).exec();
  },
  getOne(_id) {
    if (!ObjectID.isValid(_id)) return Promise.reject('ObjectID is not valid');
    return Product.find({_id: ObjectID(_id)}).exec();
  },
  getAllReviews(_id) {
    if (!ObjectID.isValid(_id)) return Promise.reject('ObjectID is not valid');
    return Product.find({_id: ObjectID(_id)}, {reviews: 1, _id: 0}).exec()
      .then((document) => document.length ? document[0].reviews || [] : []);
  },
  add(product) {
    return Product.create({
      ...product,
      lastModifiedDate: Date.now()
    });
  },
  remove(_id) {
    if (!ObjectID.isValid(_id)) return Promise.reject('ObjectID is not valid');
    return Product.remove({_id: ObjectID(_id)});
  }
};