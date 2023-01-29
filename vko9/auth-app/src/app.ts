import createError from "http-errors";

import express, { RequestHandler, ErrorRequestHandler } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import privateRouter from "./routes/private";
import todosRouter from "./routes/todos";
import mongoose from "mongoose";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routerSetup();
    this.errorHandler();
  }

  private config() {
    // view engine setup
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");

    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, "public")));

    const mongoDB = "mongodb://localhost:27017/testdb";
    mongoose.connect(mongoDB);
    mongoose.Promise = Promise;
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
  }

  private routerSetup() {
    this.app.use("/", indexRouter);
    this.app.use("/api/user", userRouter);
    this.app.use("/api/user", userRouter);
    this.app.use("/api/private", privateRouter);
    this.app.use("/api/todos", todosRouter);
  }

  private errorHandler() {
    // catch 404 and forward to error handler
    const requestHandler: RequestHandler = function (_req, _res, next) {
      next(createError(404));
    };
    this.app.use(requestHandler);

    // error handler
    const errorRequestHandler: ErrorRequestHandler = function (
      err,
      req,
      res,
      _next
    ) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    };
    this.app.use(errorRequestHandler);
  }
}

export default new App().app;
