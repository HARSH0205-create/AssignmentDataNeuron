const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  // Define schema fields here
  name: String,
  age: Number,
  mobile_number: Number
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
