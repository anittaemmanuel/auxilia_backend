var mysql = require("mysql");

var connetion = mysql.createConnection({
  host: "database-2.cqurizjk1fiz.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "Letmepass123#",
  port: 3306,
  database: "Auxilia",
});
connetion.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Database_connected");
  }
});
module.exports = connetion;
