var mongoose = require("mongoose"),
  TodoSchema,
  Todo;

mongoose.connect("mongodb://localhost/development");

TodoSchema = new mongoose.Schema({
  "todo": String,
  "categories" : [String]
});

Todo = mongoose.model("Todo", TodoSchema);

Todo.findOne({}, function (err, result) {
  if (err !== null) {
    console.log(err);
  } else if (result === null) {
    // Write sample data
    var t = new Todo({
      "todo": "Get Coffee",
      "categories": ["Home", "Work"]
    });

    var t2 = new Todo({ 
      "todo": "Get Degree",
      "categories": ["Life"]
    });

    t.save(function (err) {
      if (err !== null) {
        console.log(err);
      }
    });

    t2.save(function (err) {
      if (err !== null) {
        console.log(err);
      }
    });
  }
});

module.exports = Todo;
