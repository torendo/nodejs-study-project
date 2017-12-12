const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
  fullname: {
    type: String,
    required: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(v);
      }
    },
  },
  lastModifiedDate: Date
});