const mysql = require('mysql');

const pool  = mysql.createPool({
  connectionLimit : 10,
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DB || "leave_the_marks"
});

module.exports = pool