const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let categorySchema = new Schema({
  name: String,
  encoding: String,
  mimetype: String,
  buffer: Buffer,
});

module.exports = mongoose.model("Category", categorySchema);
