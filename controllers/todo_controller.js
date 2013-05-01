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

TodoController.destroy = function (req, res) {
  Todo.findOne({ "todo": req.body.todo }, function (err, todo) {
    if (err !== null) {
        console.log(err);
    } else if (todo === null) {
        console.log("Todo not found");
    } else {
      todo.remove(function (err) {
        if (err !== null) {
          console.log(err);
        }
      });
    }
  });
};


module.exports = TodoController;