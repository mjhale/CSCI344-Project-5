var http = require("http"),
  express = require("express"),
  path = require("path"),
  app = express(),
  tc;

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, "public")));
});

tc = require("./controllers/todo_controller.js");

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get("/", function (req, res) {
    res.render("index.html");
});

app.get("/todos.json", tc.list);
app.post("/todo/new", tc.create);
app.post("/todo/destroy", tc.destroy);

http.createServer(app).listen(3000, function () {
    console.log("Express server listening on port 3000");
});