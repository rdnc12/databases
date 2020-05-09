const util = require("util");
const mysql = require("mysql");

const { authors, papers, authorPapers } = require("./tables");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const CREATE_RESEARCH_PAPERS_TABLE = `CREATE TABLE IF NOT EXISTS Research_Papers (
          paper_id int NOT NULL AUTO_INCREMENT,
          paper_title varchar(30),
          conference varchar(30),
          publish_date DATE ,
          CONSTRAINT PK_Authors PRIMARY KEY (paper_id))`;

  const CREATE_RELATION_TABLE = `CREATE TABLE IF NOT EXISTS Author_Paper 
          (author_id int, paper_id int,
          CONSTRAINT FK_Author FOREIGN KEY(author_id) REFERENCES Authors(author_no),
          CONSTRAINT FK_Paper FOREIGN KEY(paper_id) REFERENCES Research_Papers(paper_id),
          CONSTRAINT PK_Author_Paper PRIMARY KEY(author_id, paper_id) )`;

  connection.connect();

  try {
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_RELATION_TABLE);

    authors.forEach(async (author) => {
      await execQuery("INSERT INTO Authors SET ?", author);
    });

    papers.forEach(async (paper) => {
      await execQuery("INSERT INTO Research_Papers SET ?", paper);
    });
    authorPapers.forEach(async (authorPaper) => {
      await execQuery("INSERT INTO Author_Paper SET ?", authorPaper);
    });
  } catch (error) {
    console.error(error);
    connection.end();
  } finally {
    connection.end();
  }
};

seedDatabase();
