import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import usersSchema from '../schemas/users.schema';
const User = mongoose.model('user', usersSchema);

export default {
  getAll() {
    return User.find({}).exec();
  },
  deleteOne(_id) {
    if (!ObjectID.isValid(_id)) return Promise.reject('ObjectID is not valid');
    return User.remove({_id: ObjectID(_id)});
  }
};