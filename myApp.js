require("dotenv").config();

let express = require("express");
let app = express();

app.get('/now', function actualTime(req, res, next) {
  
})

app.use(function createRegistry(req, res, next) {
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

console.log("Hello World");

app.get("/", function (req, res) {
  //res.send('Hello Express');
  absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function (req, res) {
  let response = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: response.toUpperCase() });
  } else {
    res.json({ message: response });
  }
});

module.exports = app;
