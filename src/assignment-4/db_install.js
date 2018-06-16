const mysql = require('mysql');

const con = mysql.createConnection({
  host: process.env.MYSQL_ADMIN_HOST || "127.0.0.1",
  port: process.env.MYSQL_ADMIN_PORT || 3306,
  user: process.env.MYSQL_ADMIN_USER || "root",
  // password: process.env.MYSQL_ADMIN_PASSWORD || "root"
});

const USERS = "CREATE TABLE IF NOT EXISTS users (userid SMALLINT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(10) NOT NULL, password VARCHAR(10) NOT NULL, status BIT(2) NOT NULL) ENGINE = InnoDB;";
const STORIES = "CREATE TABLE IF NOT EXISTS stories (storyid SMALLINT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, story VARCHAR(30) NOT NULL, userid SMALLINT(6) UNSIGNED, INDEX (userid), FOREIGN KEY (userid) REFERENCES USERS(userid)) ENGINE = InnoDB;";

con.connect((err) => {
  if (err) throw console.error('error connecting: ' + err.stack);

  console.log(`Connected id: ${con.threadId}`);
});

// Create new database and use that.
con.query("CREATE DATABASE IF NOT EXISTS leave_the_marks", (err, result) => {
  if (err) throw console.error(err.stack);

  console.log("Database created");
});

con.query("USE leave_the_marks", (err, result) => {
  if (err) throw console.error(err.stack);

  console.log("Using database leave_the_marks");
});

con.query(USERS, (err, result) => {
  if (err) throw console.error(err.stack);
  console.log("User table created");
});

//Show TABLE STATUS.
con.query("SHOW TABLE STATUS", (err, result) => {
  if (err) throw console.error(err.stack);

  console.log("Table Status", result);
});

con.query(STORIES, (err, result) => {
  if (err) throw console.error(err.stack);

  console.log("Story table created");
});

con.end(function(err) {
  console.log(`Connection id ${con.threadId} is terminated!`);
});
