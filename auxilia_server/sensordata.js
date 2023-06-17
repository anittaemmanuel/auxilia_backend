const db=require('./dbconnection/db');
const promise=require('Promise')
module.exports={
insertsensordata:(data)=>{
      return new promise((resolve,reject)=>{
        db.query(`INSERT INTO sensordata (heartrate,spo2) VALUES ?`,[data],(err,result)=>{

          if(err){
            reject(err);
          }
          else{
            if(result.affectedRows>0){
                  console.log("Inserted");
            }
            else{
                  reject();
            }
          }
        })
      })
},
}