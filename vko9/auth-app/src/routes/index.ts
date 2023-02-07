import express from "express";
import { getLogger } from "@/utils/loggers";
const router = express.Router();
const logger = getLogger("INDEX_ROUTE");

/* GET home page. */
router.get("/", function (_req, res, _next) {
  logger.info("hello Express");
  res.render("index", { title: "Express" });
});

router.get("/register.html", function (_req, res, _next) {
  logger.info("Register page");
  res.render("register");
});

router.get("/login.html", function (_req, res, _next) {
  logger.info("Login page");
  res.render("login");
});
export default router;
