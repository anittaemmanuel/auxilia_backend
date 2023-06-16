const promise = require("Promise");
const db = require("../dbconnection/db");

module.exports = {
  addStudent: (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      db.query(
        `INSERT INTO student (name, class) VALUES ?`,
        [data],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (result.affectedRows > 0) {
              db.query(`SELECT * FROM student`, (err, results) => {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  // console.log(results);
                  resolve({ status: "Inserted", data: results });
                }
              });
            } else {
              reject({ data: "Not inserted" });
            }
          }
        }
      );
    });
  },

  display_addstudent: () => {
    return new promise((resolve, reject) => {
      db.query(`select * from student`, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (result.length > 0) {
            resolve({ data: result, status: "Display_data" });
          } else {
            reject({ data: "Data_not_be_inserted" });
          }
        }
      });
    });
  },
  signup: (signup_data) => {
    return new promise((resolve, reject) => {
      db.query(
        `INSERT INTO login (name, email, flag, password) VALUES ?`,
        [signup_data],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            if (result.affectedRows > 0) {
              resolve({
                data: "Inserted",
                status: "SUCCESS",
              });
            } else {
              reject({ data: "insertion_err" });
            }
          }
        }
      );
    });
  },

  delete_student: (name) => {
    console.log(name);
    return new promise((resolve, reject) => {
      db.query(`DELETE FROM student WHERE name = '${name}'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ status: "name_deleted" });
        }
      });
    });
  },
  update_student: (name, level) => {
    return new promise((resolve, reject) => {
      db.query(
        `UPDATE student SET class='${level}' WHERE name='${name}'`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve({ status: "Data_updated" });
          }
        }
      );
    });
  },

  addtask: (letter) => {
    console.log(letter);
    return new Promise((resolve, reject) => {
      console.log(`INSERT INTO letter(addletter) VALUES ('${letter}')`);
      db.query(
        `INSERT INTO letter(addletter) VALUES ('${letter}')`,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (results.affectedRows > 0) {
              db.query(`select * from letter`, (err, result) => {
                if (err) {
                  reject(console.log(err));
                } else {
                  if (result.length > 0) {
                    // console.log(result)
                    resolve({ status: "Success", data: result });
                  } else {
                    reject({ data: null, status: "Not_success" });
                  }
                }
              });
            }
          }
        }
      );
    });
  },

  display: () => {
    return new promise((resolve, reject) => {
      // console.log(`SELECT * FROM letter`);
      db.query(`SELECT * FROM letter`, (err, result) => {
        if (err) {
          reject(console.log(err));
        } else {
          if (result.length > 0) {
            resolve({ data: result, status: "success" });
          } else {
            reject({ data: "error", status: "not_success" });
          }
        }
      });
    });
  },
};
