//set variable for express and router
const router = require("express").Router();
// set variable for todo using model schema todo
let Todo = require("../models/todo.model");
//get all ttodo item
router.get("/", (req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json("Error:" + err));
});
//getone todo item
router.get("/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json("Error:" + err));
});
//add todo item
router.post("/addNewTodo", (req, res) => {
  const task = req.body.task;
  const completed = req.body.completed;
  const newTodo = new Todo({
    task,
    completed
  });
  newTodo
    .save()
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json("Error while adding new todo:" + err));
});
//update/edit todod item
router.post("/:id/update", (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      todo.task = req.body.task;
      todo.completed = Boolean(req.body.completed);

      todo
        .save()
        .then(updatedtodo => res.json(updatedtodo))
        .catch(err => res.status(400).json("Error:" + err));
    })
    .catch(err => res.status(400).json("Error:" + err));
});
//delete todo item
router.delete("/:id/delete", (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(res.send("Todo item is deleted!"))
    .catch(err => res.status(400).json("Error:" + err));
});
//export model router
module.exports = router;
