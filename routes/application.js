const express = require("express");
const application = express.Router();
var jwt = require("jsonwebtoken");
const login = require("../Authetication/auth");
const db = require("../dbconnection/db");
const { verifyToken } = require("../middleware/middleware");
const session = require("express-session");
const student = require("../student/student");

application.get("/test", (req, res) => {
  res.json({ message: "oi" });
});

application.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  login
    .auth(email, password)
    .then((data) => {
      if (data.status == "Set") {
        const name = data.data;

        console.log(name);
        jwt.sign({ name }, "secret", { expiresIn: 186400 }, (err, token) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "token generation error" });
          } else {
            // console.log(token);
            if (data.flag == "student") {
              // console.log(name);
              res.json({
                message: "LOGIN_SUCCESS_student",
                name: name,
                token: token,
              });
            } else if (data.flag=="teacher") {
               
              console.log("responsing");
              res.json({
                message: "LOGIN_SUCCESS_teacher",
                name: name,
                token: token,
              });
            } else {
              res.status(401).json({ message: "ERROR" });
            }
          }
        });
      } else {
        res.status(500).json({ message: "ERROR" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "internal server error" });
    });
});

application.get("/getstudents", verifyToken, (req, res) => {
  student
    .display_addstudent()
    .then((data) => {
      if (data.status == "Display_data") {
        // console.log(data.data);
        res.json({ message: "DISPLAY", data: data.data });
      } else {
        res.status(401).json({ message: "ERROR" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal_server" });
    });
});

application.post("/addstudent", (req, res) => {
  //console.log(req.body.name, req.body.class);
  let details = [[req.body.name, req.body.class]];
  student
    .addStudent(details)
    .then((data) => {
      if (data.status == "Inserted") {
        console.log(data.data);
        res.json({ message: "DATA_ADDED", data: data.data });
      } else {
        res.status(401).json({ message: "Not inserted", data: data.result });
      }
    })

    .catch((err) => {
      res.status(500).json({ message: "Internal_Server_Error" });
    });
});

application.post("/signup", async (req, res) => {
  let query = [
    [req.body.name, req.body.email, req.body.role, req.body.password],
  ];

  student
    .signup(query)
    .then((data) => {
      if (data.data == "Inserted") {
        res.json({ message: "Inserted" });
      } else {
        res.status(401).json({ message: "Insertion_err" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "ERROR" });
      console.log(err);
    });
});

application.delete("/deletestudent/:name", (req, res) => {
  // console.log(req.params.name)
  student
    .delete_student(req.params.name)
    .then((data) => {
      if (data.status == "name_deleted") {
        res.json({ message: "DATA_DELETED" });
      } else {
        res.status(401).json({ message: "error" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal_server" });
    });
});

application.put("/updatestudent/:name/:studentClass", (req, res) => {
  console.log(req.params.name);
  console.log(req.params.studentClass);
  student
    .update_student(req.params.name, req.params.studentClass)
    .then((data) => {
      if (data.status == "Data_updated") {
        res.json({ message: "DATA_UPDATED" });
      } else {
        res.status(401).json({ message: "Not_update" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal_server_error" });
    });
});

application.post("/addTaskLetter", (req, res) => {
  student
    .addtask(req.body.letter)
    .then((data) => {
      if (data.status == "Success") {
        // console.log(data.data)
        res.json({ message: "TASK_ADDED", data: data.data });
      } else {
        res.status(401).json({ message: "ERROR" });
        console.log("error");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal_server_error" });
    });
});
application.get("/getTaskLetter", (req, res) => {
  student
    .display()
    .then((data) => {
      if (data.status == "success") {
        console.log(data.data);
        res.json({ message: "DISPLAY", data: data.data });
      } else {
        res.status(401).json({ message: "Error" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal_server_error" });
    });
});
module.exports = application;
