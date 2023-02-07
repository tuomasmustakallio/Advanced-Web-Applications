import express from "express";
import { getLogger } from "@/utils/loggers";
const router = express.Router();
const logger = getLogger("USER_ROUTE");
import { body, validationResult } from "express-validator";
import Users, { IUser } from "../models/Users";
const bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/register",
  body("email").isEmail().trim().escape(),
  body("password")
    .isLength({ min: 8 })
    .matches("[A-Z]")
    .matches("[0-9]")
    .matches("[a-z]")
    .matches("[~`!@#$%^&*()-_+={}[]|;:<>,./?]")
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Users.findOne({ email: req.body.email }, (err: Error, user: IUser) => {
      if (err) {
        console.log(err);
        throw err;
      }
      if (user) {
        return res.status(403).json({ email: "Email already in use." });
      } else {
        bcrypt.genSalt(10, (err: any, salt: any) => {
          bcrypt.hash(req.body.password, salt, (err: any, hash: any) => {
            if (err) throw err;
            Users.create(
              {
                email: req.body.email,
                password: hash,
              },
              (err, ok) => {
                if (err) throw err;
                return res.redirect("/login.html");
              }
            );
          });
        });
      }
    });
  }
);

router.post("/login", upload.none(), (req, res, next) => {
  Users.findOne({ email: req.body.email }, (err: Error, user: IUser) => {
    if (err) throw err;
    if (!user) {
      return res.status(403).json({ message: "Login failed :(" });
    } else {
      bcrypt.compare(
        req.body.password,
        user.password,
        (err: any, isMatch: any) => {
          if (err) throw err;
          if (isMatch) {
            const jwtPayload = {
              id: user._id,
              email: user.email,
            };
            jwt.sign(
              jwtPayload,
              process.env.SECRET as string,
              {
                expiresIn: 120,
              },
              (err, token) => {
                res.json({ success: true, token });
              }
            );
          } else {
            return res.status(403).json({ message: "password did not match" });
          }
        }
      );
    }
  });
});

export default router;
