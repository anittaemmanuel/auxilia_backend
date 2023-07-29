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


 // Error handler for 404 Not Found
app.use(function (req, res, next) {
  console.log(req.url);
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.status(500).json("error");
});

app.listen(port, () => {
  console.log(`Port is listening on ${port}`);
});
