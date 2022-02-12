const mongoose = require("mongoose");

const elementScheme = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  styles: {
    type: {
      fontFamily: String,
      fontSize: String,
      fontWeigth: String,
    },
  },
  writer: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
});

const Element = mongoose.model("Element", elementScheme);

module.exports = Element;
