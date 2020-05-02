const util = require("util");
const mysql = require("mysql");
const tables = require("./exercise1Tables");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const createInvitee =
    "CREATE TABLE IF NOT EXISTS Invitee (invitee_no int(3) ZEROFILL NOT NULL, invitee_name varchar(20), invited_by varchar(20), CONSTRAINT PK_Invitee_No PRIMARY KEY (invitee_no))";
  const createRoom =
    "CREATE TABLE IF NOT EXISTS Room ( room_no int NOT NULL, room_name varchar(20), floor_number int, CONSTRAINT PK_Room_No PRIMARY KEY (room_no))";
  const createMeeting =
    "CREATE TABLE IF NOT EXISTS Meeting ( meeting_no int NOT NULL AUTO_INCREMENT, meeting_title varchar(20), starting_time DATETIME NOT NULL , ending_time DATETIME, room_no int NOT NULL, CONSTRAINT PK_Meeting_No PRIMARY KEY (meeting_no))";

  connection.connect();
  try {
    await Promise.all[
      (execQuery(createInvitee), execQuery(createRoom), execQuery(createMeeting))
    ];

    await Promise.all(
      Object.keys(tables).map((entity) => {
        tables[entity].map(async (entityInstance) => {
          await execQuery(`INSERT INTO ${entity} SET ?`, entityInstance);
        });
      })
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

seedDatabase()
