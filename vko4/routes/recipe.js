const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("../models/Recipes");
const router = express.Router();

/* GET requested recipe. */
router.get("/:food", function (req, res, next) {
  const mealName = req.params.food;

  Recipe.findOne({ name: mealName }, (err, recipe) => {
    if (err) return next(err);
    if (recipe) {
      return res.json(recipe);
    } else {
      return res.status(403).send({ name: "No recipe found!" });
    }
  });
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  Recipe.findOne({ name: req.body.name }, (err, recipe) => {
    if (err) return next(err);
    if (!recipe) {
      new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        categories: req.body.categories,
      }).save((err) => {
        if (err) return next(err);
        return res.send(req.body);
      });
    } else {
      return res.status(403).send({ name: "Already has that recipe!" });
    }
  });
});

module.exports = router;
