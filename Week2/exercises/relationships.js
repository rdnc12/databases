const util = require("util");
const mysql = require("mysql");

const { papers, Author_Paper, collaborator } = require("./tables");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2DB",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const CREATE_RESEARCH_PAPERS_TABLE = `CREATE TABLE IF NOT EXISTS Research_Papers (
          paper_id INT PRIMARY KEY,
          paper_title VARCHAR(30),
          conference VARCHAR(30),
          publish_date DATE )`;

  const CREATE_RELATION_TABLE = `CREATE TABLE IF NOT EXISTS Author_Paper 
          (author_id INT, paper_id INT,
          CONSTRAINT FK_Author FOREIGN KEY(author_id) REFERENCES Authors(author_no),
          CONSTRAINT FK_Paper FOREIGN KEY(paper_id) REFERENCES Research_Papers(paper_id),
          CONSTRAINT PK_Author_Paper PRIMARY KEY(author_id, paper_id) )`;

  connection.connect();

  try {
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_RELATION_TABLE);
   
    await Promise.all(
      papers.map((paper) => {
        execQuery("INSERT INTO Research_Papers SET ?", paper);
      })
    );
    await Promise.all(
      collaborator.map((item, index) => {
        execQuery(
          `UPDATE Authors SET collaborator = ${item} WHERE author_no = ${++index} `
        );
      })
    );
    
    await Promise.all(
      Author_Paper.map((authorPaper) => {
        execQuery("INSERT INTO Author_Paper SET ?", authorPaper);
      })
    );
  } catch (error) {
    console.error(error);
    connection.end();
  }
};

seedDatabase();
