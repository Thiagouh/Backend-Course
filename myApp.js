require("dotenv").config();
let bodyParser = require("body-parser");
let express = require("express");
let app = express();

/////////////////////////////////////////////////////////////////

// console.log("Hello World");

app.use(function createRegistry(req, res, next) {
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

/////////////////////////////////////////////////////////////////

app.get("/", function (req, res) {
  //res.send('Hello Express');
  absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

/////////////////////////////////////////////////////////////////

app.use("/public", express.static(__dirname + "/public"));

/////////////////////////////////////////////////////////////////

app.get("/json", function (req, res) {
  let response = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: response.toUpperCase() });
  } else {
    res.json({ message: response });
  }
});

/////////////////////////////////////////////////////////////////

app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word,
  });
});

/////////////////////////////////////////////////////////////////

app.use("/name", bodyParser.urlencoded({extended: false}));

/* app.get("/name", (req, res) => {
  let firstName = req.query.first;
  let lastName = req.query.last;
  let completedName = `${firstName} ${lastName}`;
  res.json({ name: completedName });
}) */

app.post("/name", (req, res) => {
  let name = req.body.first + " " + req.body.last;
  res.json({ name: name });
})

/////////////////////////////////////////////////////////////////

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

/////////////////////////////////////////////////////////////////

module.exports = app;
