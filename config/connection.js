const mysql = require('mysql2');
require('dotenv').config()

  const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_DB
    },
    console.log(`Connected to db`)
  );

module.exports = db;