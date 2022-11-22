const express = require("express");
const router = express.Router();

let db = [];

router.post("", function (req, res, next) {
  res.send(JSON.stringify("Hi"));
});

module.exports = router;
