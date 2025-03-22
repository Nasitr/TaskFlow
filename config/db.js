require("dotenv").config();
const mysql = require("mysql2");

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST ,
      user: process.env.MYSQL_USER ,
      password: process.env.MYSQL_PASS ,
      database: process.env.MYSQL_DATABASE ,
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 20000, // Increase the connection timeout to 20 seconds
    });

    // Test the connection
    this.pool.getConnection((err, connection) => {
      if (err) {
        console.error("Database connection error:", err);
      } else {
        console.log("Database connected successfully!");
        connection.release();
      }
    });
  }

  query(sql, values) {
    console.log("Executing SQL:", sql);
    console.log("With values:", values);
    return this.pool.promise().query(sql, values);
  }
}

module.exports = new Database();