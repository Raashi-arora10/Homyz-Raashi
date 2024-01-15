const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
