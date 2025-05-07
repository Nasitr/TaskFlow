const { pool } = require('../config/database');

class ProjectMember {
    async addMember(project_id, user_id, role = 'member') {
        await pool.execute(
            'INSERT INTO project_members (project_id, user_id, role) VALUES (?, ?, ?)',
            [project_id, user_id, role]
        );
    }

    async findMembers(project_id) {
        const [rows] = await pool.execute(
            `SELECT u.id, u.name, u.email, pm.role
             FROM users u
             JOIN project_members pm ON u.id = pm.user_id
             WHERE pm.project_id = ?`,
            [project_id]
        );
        return rows;
    }
}

module.exports = new ProjectMember();
