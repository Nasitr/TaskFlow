const db = require("../../config/db");
// const bcrypt = require("bcrypt");

class UserModel {
  // Find a user by username or email
  async findUserByUsernameOrEmail(username, email) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    return rows[0];
  }

  // Create a new user
  async createUser(username, email, password) {
    //const hashedPassword = await bcrypt.hash(password, 10);
    console.log("db-result---enter")
    const [result] = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );
    console.log("db-result", result)
    return result.insertId;
  }

  // Compare passwords
  async comparePasswords(inputPassword, hashedPassword) {
    // return await bcrypt.compare(inputPassword, hashedPassword);
  }
}

module.exports = new UserModel();