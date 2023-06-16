const promise=require('promise')
const db=require('../dbconnection/db')

module.exports={
      auth:(username,password)=>{
            console.log(username,password)
            return new promise((resolve, reject) => {
                  db.query(
                    `select * from login where email='${username}' and password='${password}'`,
                    (err, result) => {
                      if (err) {
                        console.log(err);
                        reject(err)
                      } else {
                        if (result.length > 0) {
                          console.log(result[0].flag)
                              
                          resolve({ data:result[0].name,
                              flag:result[0].flag,
                              status:"Set"
                         });
                          
                        } else {
                          resolve({ 
                              data: "NO Datafetch",
                               status: "no data"
                               });
                        }
                      }
                    }
                  );
                  
                  

            })


      }
      
}
