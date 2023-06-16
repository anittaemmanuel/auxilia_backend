const promise = require("Promise");
const db = require("../dbconnection/db");

module.exports={
// insertsensordata:(data)=>{
//       return new promise((resolve,reject)=>{
//         db.query(`INSERT INTO sensordata (heartrate,spo2) VALUES ?`,[data],(err,result)=>{

//           if(err){
//             reject(err);
//           }
//           else{
//             if(result.affectedRows>0){
//                   console.log("Inserted");
//             }
//             else{
//                   reject();
//             }
//           }
//         })
//       })
// },

dataview: () => {
  return new promise((resolve, reject) => {
    db.query(
      `SELECT * FROM sensordata ORDER BY id DESC LIMIT 1`,
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (result.length > 0) {
            console.log("datahere")
            
            resolve({ heartrate: result[0].heartrate,spo2:result[0].spo2,temp:result[0].temp,status: "success" });
          } else {
            reject({ data: null });
          }
        }
      }
    );
  });
},


}