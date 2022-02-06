const mongoose = require("mongoose");

const nodeScheme = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
  },
  children: {
    type: [String],
  },
  writer: {
    type: String,
    required: true,
  },
});

const Node = mongoose.model("Node", nodeScheme);

module.exports = Node;
