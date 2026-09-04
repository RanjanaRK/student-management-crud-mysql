const mysql2 = require("mysql2");

const env = require("dotenv").config();

const con = mysql2.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
});

con.connect((error) => {
  if (error) throw error;
  else {
    console.log("Successfully connected to MYSQL");
  }
});

module.exports = con;
