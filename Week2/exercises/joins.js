const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedData = async () => {
  const PRINTS_AUTHORS_NAME = `SELECT a.author_name AS Name , b.author_name AS Collaborator
                                FROM Authors a, Authors b 
                                WHERE a.author_no = b.collaborator`;

  const COLUMN_AUTHORS_AND_PAPER_TITLE = `SELECT * FROM Authors AS A LEFT JOIN research_papers
                         AS B on b.author_id= a.author_no`;

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
