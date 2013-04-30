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

TodoController.create = function (req, res) {
  var t = new Todo({
    "todo": req.body.todo,
    "categories": req.body.categories
  });

  t.save(function (err, result) {
    if (err !== null) {
        //send the error
    } else {
        res.json(result);
    }
  });
};

module.exports = TodoController;