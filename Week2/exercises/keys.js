const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const CREATE_AUTHORS_TABLE = `CREATE TABLE IF NOT EXISTS Authors (
        author_no int NOT NULL AUTO_INCREMENT,
        author_name varchar(30),
        university varchar(30),
        date_of_birth DATE ,
        h_index int,
        gender enum('f','m'),
        CONSTRAINT PK_Authors PRIMARY KEY (author_no))`;

  const ADD_COLLABORATOR = ` ALTER TABLE Authors
                             ADD COLUMN collaborator int`;

  const ADD_FOREIGN_KEY = `ALTER TABLE Authors
                            ADD CONSTRAINT FK_Authors
                            FOREIGN KEY(collaborator)
                            REFERENCES Authors(author_no)`;

  connection.connect();

  try {
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ADD_COLLABORATOR);
    await execQuery(ADD_FOREIGN_KEY);
  } catch (error) {
    console.error(error);
    connection.end();
  } finally {
    connection.end();
  }
};

seedDatabase();
