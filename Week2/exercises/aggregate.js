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
  const query1 = `SELECT rp.paper_title, COUNT(DISTINCT a.author_no) AS 'Authors' FROM  Author_Paper a RIGHT JOIN research_papers rp ON rp.paper_id = a.paper_id GROUP BY rp.paper_id`;

  const query2 = `SELECT COUNT(rp.paper_id) FROM Author_Paper ap JOIN research_papers rp 
   ON ap.paper_id = rp.paper_id RIGHT JOIN  authors a ON a.author_no = ap.author_no WHERE a.gender='f'`;
  const query3 = `SELECT AVG(h_index),university FROM Authors GROUP BY university `;

  const query4 = `SELECT AVG(h_index), university FROM authors AS a inner join research_papers 
                    AS rp ON a.author_no= rp.author_no group by a.university`;

  const query5 = `SELECT MIN(h_index), MAX(h_index), university FROM Authors GROUP BY university`;

  connection.connect();

  try {
    console.log(
      "All research papers and the number of authors that wrote that paper",
      await execQuery(query1)
    );
    console.log(
      "Sum of the research papers published by all female authors",
      await execQuery(query2)
    );
    console.log(
      "Average of the h-index of all authors per university",
      await execQuery(query3)
    );
    console.log(
      "Sum of the research papers of the authors per university.",
      await execQuery(query4)
    );
    console.log(
      "Minimum and maximum of the h-index of all authors per university",
      await execQuery(query5)
    );
  } catch (error) {
    console.error(error);
    connection.connect();
  } finally {
    connection.connect();
  }
};

seedData();
