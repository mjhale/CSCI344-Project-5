var Todo = require("../models/todo.js"),
  TodoController = {};

TodoController.list = function (req, res) {
  Todo.find({}, function (err, todo) {
    if (err !== null ) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
}

module.exports = TodoController;