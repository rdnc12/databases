const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const connect = util.promisify(connection.connect.bind(connection));
const executeQuery = util.promisify(connection.query.bind(connection));

const createTables = async () => {
  const createAccountTable = `CREATE TABLE IF NOT EXISTS account 
                    (account_number VARCHAR(5) PRIMARY KEY,
                    balance DECIMAL(8)  NOT NULL)`;
  const createAccountChangesTable = `CREATE TABLE IF NOT EXISTS account_changes
                    (change_number INT AUTO_INCREMENT PRIMARY KEY,
                    account_number VARCHAR(5) NOT NULL ,
                     amount DECIMAL(8) NOT NULL,
                    date DATETIME NOT NULL, 
                    remark VARCHAR(15), 
                    CONSTRAINT FK_Account_Number FOREIGN KEY (account_number) REFERENCES account(account_number))`;

  try {
    await connect();

    await Promise.all[
      (executeQuery("DROP DATABASE IF EXISTS transaction"),
      executeQuery("CREATE DATABASE IF NOT EXISTS transaction"),
      executeQuery("USE transaction"),
      executeQuery(createAccountTable),
      executeQuery(createAccountChangesTable))
    ];

    connection.end();
  } catch (error) {
    console.error(error);
    connection.end();
  }
};

createTables();
