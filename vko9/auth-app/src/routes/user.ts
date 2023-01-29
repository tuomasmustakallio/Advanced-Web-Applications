import express from "express";
import { getLogger } from "@/utils/loggers";
const router = express.Router();
const logger = getLogger("USER_ROUTE");
import { body, validationResult } from "express-validator";
import Users, { IUser } from "../models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            Users.create(
              {
                email: req.body.email,
                password: hash,
              },
              (err, ok) => {
                if (err) throw err;
                return res.send("ok");
              }
            );
          });
        });
      }
    });
  }
);

router.post(
  "/login",
  body("email").trim().escape(),
  body("password").escape(),
  (req, res, next) => {
    Users.findOne({ email: req.body.email }, (err: Error, user: IUser) => {
      if (err) throw err;
      if (!user) {
        return res.status(403).json({ message: "Login failed :(" });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
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
          }
        });
      }
    });
  }
);

export default router;
