const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recipe = require("../models/Recipes");

let db = [];

router.post("", function (req, res, next) {
  console.log(req.body.img);
  Recipe.findOne({ name: req.body.img }, (err, img) => {
    if (err) {
      return next(err);
    }
    if (img) {
      req.files.forEach((image) => {
        let db = new Images({
          buffer: image.buffer,
          mimetype: image.mimetype,
          name: image.originalname,
          encoding: image.encoding,
        });
        db.save((err) => {
          if (err) {
            return next(err);
          }
        });
        img.images.push(db._id);
        img.save();
      });
    } else {
      return res.status(403).send("No image!");
    }
  });
});

module.exports = router;
