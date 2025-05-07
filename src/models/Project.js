const { pool } = require('../config/database');

class Project {
    async create({ name, description, owner_id }) {
        const [result] = await pool.execute(
            'INSERT INTO projects (name, description, owner_id) VALUES (?, ?, ?)',
            [name, description, owner_id]
        );
        return result.insertId;
    }

    async findAllByUser(user_id) {
        const [rows] = await pool.execute(
            `SELECT p.* FROM projects p
             JOIN project_members pm ON p.id = pm.project_id
             WHERE pm.user_id = ?`,
            [user_id]
        );
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [id]);
        return rows[0];
    }

    async update(id, { name, description }) {
        await pool.execute(
            'UPDATE projects SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );
    }

    async delete(id) {
        await pool.execute('DELETE FROM projects WHERE id = ?', [id]);
    }

    async deleteRelated(projectId) {
        await pool.execute('DELETE FROM tasks WHERE project_id = ?', [projectId]);
        await pool.execute('DELETE FROM project_members WHERE project_id = ?', [projectId]);
    }

    async updateStatusAndDeadline(id, { status, deadline }) {
        await pool.execute(
            'UPDATE projects SET status=?, deadline=? WHERE id=?',
            [status, deadline, id]
        );
    }
}

module.exports = new Project();