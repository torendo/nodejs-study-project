import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import citiesSchema from '../schemas/cities.schema';
const City = mongoose.model('city', citiesSchema);

export default {
  getAll() {
    return City.find({}).exec();
  },
  getOne(_id) {
    if (!ObjectID.isValid(_id)) return Promise.reject('ObjectID is not valid');
    return City.find({_id: ObjectID(_id)}).exec();
  },
  add(city) {
    return City.create({
      ...city,
      lastModifiedDate: Date.now()
    });
  },
  update(city, _id) {
    if (_id) {
      if (!ObjectID.isValid(_id)) return Promise.reject('ObjectID is not valid');
      return City.update({_id: ObjectID(_id)}, {
        ...city,
        lastModifiedDate: Date.now()
      });
    } else {
      this.addOne(city);
    }
  },
  remove(_id) {
    if (!ObjectID.isValid(_id)) return Promise.reject('ObjectID is not valid');
    return City.remove({_id: ObjectID(_id)});
  }
};