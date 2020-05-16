const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transaction",
});

const connect = util.promisify(connection.connect.bind(connection));
const executeQuery = util.promisify(connection.query.bind(connection));

const transaction = async () => {
    
  try {
    await connect();
    await executeQuery("SET autocommit = 0");
    await executeQuery("START TRANSACTION");
    await executeQuery(
      `UPDATE account SET balance = balance - 1000 WHERE account_number = '00101'`
    );
    await executeQuery(
      `UPDATE account SET balance = balance + 1000 WHERE account_number = '00102'`
    );
    await executeQuery(`INSERT INTO account_changes SET ?`, {
      account_number: "00101",
      amount: -1000,
      date: "2020-03-03",
      remark: "salary",
    });
    await executeQuery(`INSERT INTO account_changes SET ?`, {
      account_number: "00102",
      amount: 1000,
      date: "2020-03-03",
      remark: "renting money",
    });
    await executeQuery("COMMIT");

    connection.end();
  } catch (error) {
    console.error(error);
    await executeQuery("ROLLBACK");
    connection.end();
  }
};

transaction();
