const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipeSchema = new Schema({
  instructions: Array,
  ingredients: Array,
  name: String,
  categories: Array,
  images: Array,
});

module.exports = mongoose.model("Recipe", recipeSchema);
