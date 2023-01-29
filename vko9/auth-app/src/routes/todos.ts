import express from "express";
import { getLogger } from "@/utils/loggers";
import validateToken from "@/auth/validateToken";
import Todo, { ITodo } from "@/models/Todo";
import Users, { IUser } from "@/models/Users";

const router = express.Router();
const logger = getLogger("TODOS_ROUTE");

router.post("/", validateToken, (req, res, next) => {
  Users.findOne({ email: (req as any).user.email }, (err: Error, user: any) => {
    if (err) {
      console.log(err);
      throw err;
    }
    if (user) {
      Todo.findOne({ user: user._id }, (err: Error, todo: ITodo) => {
        if (err) {
          console.log(err);
          throw err;
        }
        if (todo) {
          Todo.updateOne(
            { user: user._id },
            { items: todo.items.concat(req.body.items) },
            (err: any, ok: any) => {
              if (err) throw err;
            }
          );
          return res.send("ok");
        } else {
          Todo.create(
            {
              user: user._id,
              items: req.body.items,
            },
            (err, ok) => {
              if (err) throw err;
              return res.send("ok");
            }
          );
        }
      });
    } else {
      return res.status(403).send("User not found.");
    }
  });
});

export default router;
