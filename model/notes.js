const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contentSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
    required: true,
  },
});

const content = mongoose.model("note", contentSchema);

module.exports = content;
