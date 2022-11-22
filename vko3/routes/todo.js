const express = require("express");
const router = express.Router();
const db = [];

/* GET users listing. */
router.post("/todo", (req, res) => {
  let userName = req.body.user;
  let task = req.body.task;
  let user = db.find((user) => {
    return user.name === userName;
  });
  if (user) {
    user.todos.push(task);
    res.send(JSON.stringify("Todo added"));
  } else {
    db.push({ name: userName, todos: [task] });
    res.send(JSON.stringify("User added"));
  }
});

router.get("/user/:id", async (req, res) => {
  let user = await db.find((user) => {
    return user.name === req.params.id;
  });
  if (user) {
    res.send(user);
  } else {
    res.send(JSON.stringify("User not found"));
  }
});

router.delete("/user/:id", async (req, res) => {
  let user = await db.find((user) => {
    return user.name === req.params.id;
  });
  if (user) {
    db.splice(user);
    res.send(JSON.stringify("User deleted"));
  } else {
    res.send(JSON.stringify("User not found"));
  }
});

router.put("/user", async (req, res) => {
  let user = await db.find((user) => {
    return user.name === req.body.user;
  });
  if (user) {
    user.todos = user.todos.filter((task) => task != req.body.task);
    res.send(JSON.stringify("Task deleted"));
  } else {
    res.send(JSON.stringify("User not found"));
  }
});

module.exports = router;
