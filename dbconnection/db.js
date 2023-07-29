var mysql = require("mysql");

var connetion = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "auxillia",
});
connetion.connect((err)=>{
     if(err){
    
        console.error("Database_connected" + err);
     }
     else{
        console.log("Database_connected");
     }
})
module.exports = connetion;
