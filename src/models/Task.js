const { pool } = require('../config/database');

class Task {
    async create({ project_id, title, description, assignee_id, deadline, priority }) {
        const [result] = await pool.execute(
            'INSERT INTO tasks (project_id, title, description, assignee_id, deadline, priority) VALUES (?, ?, ?, ?, ?, ?)',
            [project_id, title, description, assignee_id, deadline, priority]
        );
        return result.insertId;
    }

    async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
        return rows[0];
    }

    async update(id, { title, description, assignee_id, deadline, priority, status }) {
        await pool.execute(
            'UPDATE tasks SET title=?, description=?, assignee_id=?, deadline=?, priority=?, status=? WHERE id=?',
            [title, description, assignee_id, deadline, priority, status, id]
        );
    }

    async delete(id) {
        await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
    }

    async findByProject(project_id) {
        const [rows] = await pool.execute('SELECT * FROM tasks WHERE project_id = ?', [project_id]);
        return rows;
    }

    async findAllByUser(user_id) {
        const [rows] = await pool.execute('SELECT * FROM tasks WHERE assignee_id = ?', [user_id]);
        return rows;
    }

    async updateStatus(id, status) {
        await pool.execute('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
    }
}

module.exports = new Task();