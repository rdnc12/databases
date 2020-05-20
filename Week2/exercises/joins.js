const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2DB",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedData = async () => {
  const PRINTS_AUTHORS_NAME = `SELECT a.author_name AS Name , b.author_name AS Collaborator
                                FROM Authors a
                                LEFT JOIN Authors b 
                                ON a.author_no = b.collaborator`;

  const COLUMN_AUTHORS_AND_PAPER_TITLE = `SELECT a.author_name,
                                          rp.paper_title 
                                          FROM Authors a 
                                          LEFT JOIN Author_Paper p 
                                          ON (a.author_no = p.author_id)
                                          LEFT JOIN Research_Papers rp 
                                          ON (p.paper_id = rp.paper_id)`;

  connection.connect();

  try {
    await execQuery(PRINTS_AUTHORS_NAME);
    await execQuery(COLUMN_AUTHORS_AND_PAPER_TITLE);
  } catch (error) {
    console.error(error);
    connection.end();
  } finally {
    connection.end();
  }
};

seedData();
