const Task = require('../models/Task');
const Project = require('../models/Project');

class TaskController {
    // Show the create task form
    async showCreate(req, res) {
        const project = await Project.findById(req.params.projectId);
        res.render('tasks/create', { project });
    }

    async create(req, res) {
        const { title, description, assignee_id, deadline, priority } = req.body;
        await Task.create({
            project_id: req.params.projectId,
            title,
            description,
            assignee_id: assignee_id || null,
            deadline: deadline || null,
            priority: priority || 'medium'
        });
        res.redirect(`/projects/${req.params.projectId}`);
    }

    async updateStatus(req, res) {
        const { status } = req.body;
        await Task.updateStatus(req.params.id, status);
        res.redirect('back');
    }

    async showEdit(req, res) {
        const task = await Task.findById(req.params.id);
        res.render('tasks/edit', { task });
    }

    async edit(req, res) {
        const { title, description, assignee_id, deadline, priority, status } = req.body;
        await Task.update(req.params.id, { title, description, assignee_id, deadline, priority, status });
        res.redirect(`/projects/${task.project_id}`);
    }

    async delete(req, res) {
        const task = await Task.findById(req.params.id);
        await Task.delete(req.params.id);
        res.redirect(`/projects/${task.project_id}`);
    }
}

module.exports = new TaskController();