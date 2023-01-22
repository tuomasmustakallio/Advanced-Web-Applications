import express, { Express, Request, Response } from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import passport from "passport";

const app: Express = express();
const port: number = 3000;

function getUserByUsername(username: string) {
  return users.find((user) => user.username === username);
}

function getUserById(id: number) {
  return users.find((user) => user.id === id);
}

function checkAuthenticated(req: Request, res: Response, next: Function) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Not authenticated");
}

function checkNotAuthenticated(req: Request, res: Response, next: Function) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

const initializePassport = require("./passport-config");
initializePassport(passport, getUserByUsername, getUserById);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "ASFSDF#45jk242SDf3242sdf",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

type User = {
  id: number;
  username: string;
  password: string;
};

const users: User[] = [];

type Todos = {
  id: number;
  todos: string[];
};

const todos: Todos[] = [];

app.post(
  "/api/user/register",
  checkNotAuthenticated,
  async (req: Request, res: Response) => {
    if (users.some((user) => user.username === req.body.username)) {
      res.status(400).send("Username already taken");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user: User = {
        id: users.length + 1,
        username: req.body.username,
        password: hashedPassword,
      };
      users.push(user);
      res.status(200).send(user);
    }
  }
);

app.post(
  "/api/user/login",
  checkNotAuthenticated,
  passport.authenticate("local", {}),
  (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Login failed");
    }
  }
);

app.get("/api/secret", checkAuthenticated, (req: Request, res: Response) => {
  res.status(200).send("Secret page");
});

app.get("/api/user/list", (req: Request, res: Response) => {
  res.status(200).send(users);
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

app.post("/api/todos", checkAuthenticated, (req: Request, res: Response) => {
  const todo = todos.find((todo) => todo.id === (req.user as any).id);
  if (todo) {
    todo.todos.push(req.body.todo);
    res.status(200).send(todo);
  } else {
    // For some reason I can't get the type to be correct here so I have to use any
    const newTodo: Todos = {
      id: (req.user as any).id,
      todos: [req.body.todo],
    };
    todos.push(newTodo);
    res.status(200).send(newTodo);
  }
});

app.get("/api/todos/list", (req: Request, res: Response) => {
  res.status(200).send(todos);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
