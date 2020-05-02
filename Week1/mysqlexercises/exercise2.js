const mysql = require("mysql");
const util = require("util");
const queries = require("./exercise2Queries");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

const execQuery = util.promisify(connection.query.bind(connection));
connection.connect();

const selectFromWorld = async () => {
  try {
    await Promise.all(
      Object.keys(queries).map(async (key) => {
        console.log(key, await execQuery(queries[key]));
      })
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

selectFromWorld();
