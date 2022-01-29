const mysql = require("mysql");
const { cfg__obj_db_info } = require("../config/db");
const { fn_logic__compare_hashing_info } = require("../logic/hashing");

const MSG__DB_CONN = "Success: /server/db/index (conn.connect)\n";
const ERR_MSG__DB_CONN = "Error: /server/db/index (conn.connect)\n";
const ERR_MSG__DB_DML_SELECT = "Error: /server/db/index (conn.query:SELECT)\n";
const ERR_MSG__DB_DML_INSERT = "Error: /server/db/index (conn.query:INSERT)\n";

const DML_QUERY__SELECT_USER = "SELECT * FROM user";
const DML_QUERY__INSERT_USER = "INSERT INTO user SET ?";

const service__obj_db = {
  fn_conn__db() {
    const conn = mysql.createConnection(cfg__obj_db_info);
    conn.connect((err) => {
      if (err) {
        console.error(`${ERR_MSG__DB_CONN}${err}`);
        process.exit(1);
      }
      console.log(MSG__DB_CONN);
    });
    this.conn = conn;
  },
  fn_dml__select_user__at_login(query__obj_sign_in_info) {
    const { id, password } = query__obj_sign_in_info;

    const DML_QUERY = `${DML_QUERY__SELECT_USER} WHERE id='${id}'`;
    this.conn.query(DML_QUERY, (err, results, fields) => {
      if (err) {
        console.error(`${ERR_MSG__DB_DML_SELECT}${err}`);
        process.exit(1);
      }

      if (results[0].id !== id) {
        return;
      }

      fn_logic__compare_hashing_info(password, results[0].hashed);
      console.log(results);
      console.log(fields);
    });
  },
  fn_dml__insert_user(obj_data) {
    this.conn.query(
      DML_QUERY__INSERT_USER,
      obj_data,
      (err, results, fields) => {
        if (err) {
          console.error(`${ERR_MSG__DB_DML_INSERT}${err}`);
          process.exit(1);
        }
        console.log(results);
        console.log(fields);
      }
    );
  },
};

module.exports = service__obj_db;
