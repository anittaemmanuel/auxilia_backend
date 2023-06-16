const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
var cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./dbconnection/db");
const session = require("express-session");
var application = require("./routes/application");
var nodemcu = require("./routes/nodemcu");
const sensor=require('./student/sensor');
const port = process.env.PORT || 3000;

app.get("/favicon.ico", (req, res) => res.status(204));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/", application);
app.use("/node", nodemcu);

const createError = () => {
  console.log("set");
};

app.use(function (req, res, next) {
  next(createError(404));
});



app.get("/404", function (req, res, next) {
  next(); // trigger a 404 since no other middleware will match /404 after this one, and we're not responding here
});
app.get("/403", function (req, res, next) {
  // trigger a 403 error
  var err = new Error("not allowed!");
  err.status = 403;
  next(err);
});
app.get("/500", function (req, res, next) {
  // trigger a generic (500) error
  next(new Error("ERROR!"));
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.listen(port, () => {
  console.log(`Port is listening on ${port}`);
});
