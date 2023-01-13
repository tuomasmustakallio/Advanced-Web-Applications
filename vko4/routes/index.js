const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/Category");

/* GET home page. */
router.get("/category", function (req, res, next) {
  Category.find({}, (err, categories) => {
    if (err) return next(err);
    if (categories) {
      return res.json(categories);
    } else {
      return res.status();
    }
  });
});

module.exports = router;
