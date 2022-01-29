const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userScheme);

module.exports = User;
