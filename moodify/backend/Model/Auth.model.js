const mongoose = require("mongoose");

const UserRegisterSchema = new mongoose.Schema({
  FullName: {
    type: String,
    // required: true,
  },
  Gender: {
    type: String,
    // required: true,
  },
  Email: {
    type: String,
    // required: true,
    unique: true,
  },
  Address: {
    type: String,
    // required: true,
  },
  Username: {
    type: String,
    // required: true,
    unique: true,
  },
  Password: {
    type: String,
    // required: true,
    select : false,
  },
});

const UserRegisterModel = mongoose.model("M_user", UserRegisterSchema);

module.exports = UserRegisterModel;
