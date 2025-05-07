const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

class User {
    async findByEmail(email) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            return rows[0];
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }

    async create(userData) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const [result] = await pool.execute(
                'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
                [userData.email, hashedPassword, userData.name]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    async findAll() {
        const [rows] = await pool.execute('SELECT id, name, email FROM users');
        return rows;
    }
}

module.exports = new User(); 