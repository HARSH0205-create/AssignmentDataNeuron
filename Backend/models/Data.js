const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  // Define schema fields here
  first_name: {
    type : String,
    trim: true,
    required: true
  },
  last_name: {
    type : String,
    trim: true,
    required: false
  },
  email: {
    type : String,
    unique: true,
    lowercase: true,
    required: true
  },
});

const Data = mongoose.model("user", dataSchema);

module.exports = Data;
