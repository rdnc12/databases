const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transaction",
});

const connect = util.promisify(connection.connect.bind(connection));
const executeQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const tables = {
    account: [
      { account_number: "00101", balance: 15000 },
      { account_number: "00102", balance: 72000 },
      { account_number: "00103", balance: 110000 },
    ],
    account_changes: [
      {
        account_number: "00101",
        amount: 6500,
        date: "2025-01-01",
        remark: "House",
      },
      {
        account_number: "00102",
        amount: -5000,
        date: "2025-01-01",
        remark: "Car",
      },
    ],
  };

  try {
    await connect();

    
    Object.keys(tables)
      .map((entity) => {
        tables[entity].map(async (entityInstance) => {
          await executeQuery(`INSERT INTO ${entity} SET ?`, entityInstance);
        });
      });

    connection.end();
  } catch (error) {
    console.log(error);
    connection.end();
  }
};

seedDatabase();
