const util = require("util");
const mysql = require("mysql");
const { authors } = require("./tables");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const DROP_DB = `DROP DATABASE IF EXISTS week2DB`;
  const CREATE_DB = `CREATE DATABASE IF NOT EXISTS week2DB`;
  const USE_DB = `USE week2DB`;
  const CREATE_AUTHORS_TABLE = `CREATE TABLE IF NOT EXISTS Authors (
        author_no INT PRIMARY KEY,
        author_name VARCHAR(30),
        university VARCHAR(30),
        date_of_birth DATE ,
        h_index INT,
        gender ENUM('f','m'))`;

  const ADD_COLLABORATOR = ` ALTER TABLE Authors
                             ADD COLUMN collaborator INT`;

  const ADD_FOREIGN_KEY = `ALTER TABLE Authors
                            ADD CONSTRAINT FK_Authors
                            FOREIGN KEY(collaborator)
                            REFERENCES Authors(author_no)`;

  connection.connect();

  try {
    await Promise.all[
      (execQuery(DROP_DB),
      execQuery(CREATE_DB),
      execQuery(USE_DB),
      execQuery(CREATE_AUTHORS_TABLE),
      execQuery(ADD_COLLABORATOR),
      execQuery(ADD_FOREIGN_KEY))
    ];
    authors.forEach(async (author) => {
      await execQuery("INSERT INTO Authors SET ?", author);
    });
  } catch (error) {
    console.error(error);
    connection.end();
  } finally {
    connection.end();
  }
};

seedDatabase();
