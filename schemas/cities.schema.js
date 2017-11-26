const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  country: {
    type: String,
    required: true,
    minlength: 1
  },
  capital: {
    type: Boolean,
    required: true
  },
  location: {
    lat: {
      type: Number,
      min: -90,
      max: 90,
    },
    lon: {
      type: Number,
      min: -180,
      max: 180,
    }
  },
  lastModifiedDate: Date
});