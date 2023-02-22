const mysql = require('mysql2');
require('dotenv').config()

  const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Password123',
      database: 'office_db'
    },
    console.log(`Connected to db`)
  );

module.exports = db;