const express = require("express");
const router = express.Router();

db = [];

/* GET requested recipe. */
router.get("/:food", function (req, res, next) {
  const mealName = req.params.food;

  res.send({
    name: mealName,
    instructions: ["1", "2"],
    ingredients: ["egg", "milk", "flour"],
  });
});

router.post("/", function (req, res, next) {
  const recipe = req.body;

  db.push(recipe);

  res.send(JSON.stringify(recipe));
});

module.exports = router;
