const mongoose = require('mongoose');

const confirmDataSchema = new mongoose.Schema({
  hotelId: Number,
  roomid: Number,
  hotelname: String,
  name: String,
  stp: String,
  detail: String,
  rating: String,
  imgg: String,
});

const ConfirmData = mongoose.model('ConfirmData', confirmDataSchema);

module.exports = ConfirmData;