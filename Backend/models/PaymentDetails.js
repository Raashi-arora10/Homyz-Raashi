const mongoose = require('mongoose');

const paymentDetailsSchema = new mongoose.Schema({
  roomType: {
    type: String,
    required: true,
  },
  resortName: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: String,
    required: true,
  },
  checkOutDate: {
    type: String,
    required: true,
  },
  totalCharges: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
  },
});

const PaymentDetails = mongoose.model('PaymentDetails', paymentDetailsSchema);

module.exports = PaymentDetails;
