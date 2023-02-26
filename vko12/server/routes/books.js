var express = require("express");
const Books = require("../models/Book");
var router = express.Router();

/* GET books listing. */
router.get("/books/:id", function (req, res, next) {
  Books.findOne({ name: req.params.id }, (err, book) => {
    if (err) return next(err);
    res.json(book);
  });
});

/* POST a new book. */
router.post("/book", function (req, res, next) {
  Books.create(req.body, (err, book) => {
    if (err) return next(err);
    res.json(book);
  });
});

module.exports = router;
