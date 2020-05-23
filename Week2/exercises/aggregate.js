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
  const query1 = `SELECT rp.paper_title,
                 COUNT(DISTINCT a.author_id) AS 'Authors' 
                 FROM  Author_Paper a
                JOIN Research_Papers rp ON rp.paper_id = a.paper_id GROUP BY rp.paper_id`;

  const query2 = `SELECT COUNT(rp.paper_id)
                   FROM Author_Paper ap
                   JOIN Research_Papers rp 
                  ON ap.paper_id = rp.paper_id 
                  JOIN  Authors a ON a.author_no = ap.author_id WHERE a.gender='f'`;

  const query3 = `SELECT AVG(h_index),university FROM Authors GROUP BY university `;

  const query4 = `SELECT a.university,
                  COUNT(DISTINCT rp.paper_title) AS 'Sum of the Research Papers' 
                  FROM Authors AS a
                  INNER JOIN Research_Papers 
                  AS rp ON a.author_no= rp.paper_id 
                  GROUP BY a.university`;

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
  } 
};

seedData();
