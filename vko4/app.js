const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const recipeRouter = require("./routes/recipe");
const imgRouter = require("./routes/images");
const mongoose = require("mongoose");

const app = express();

const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/recipe", recipeRouter);
app.use("/images", imgRouter);

module.exports = app;
