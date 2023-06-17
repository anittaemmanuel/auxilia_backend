const express=require('express');
const app=express();
const port = process.env.PORT || 3001;
const logger = require("morgan");
const bodyParser = require("body-parser");
const db=require('./dbconnection/db')
var cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const sensor=require('./sensordata')

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(cors());

app.post("/main/:id", (req, res) => {
  const data = [[req.body.heartRate, req.body.spo2]];

  sensor
    .insertsensordata(data)
    .then((data) => {
      console.log(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).send("OK");
});
app.listen(port,()=>{
      console.log("port Listening...")
})