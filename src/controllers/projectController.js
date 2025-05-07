const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');
const Task = require('../models/Task');

class ProjectController {
    async list(req, res) {
        const projects = await Project.findAllByUser(req.session.user.id);
        res.render('projects/list', { projects });
    }

    async showCreate(req, res) {
        res.render('projects/create');
    }

    async create(req, res) {
        const { name, description } = req.body;
        const owner_id = req.session.user.id;
        const projectId = await Project.create({ name, description, owner_id });
        await ProjectMember.addMember(projectId, owner_id, 'owner');
        res.redirect('/projects');
    }

    async view(req, res) {
        const project = await Project.findById(req.params.id);
        const members = await ProjectMember.findMembers(req.params.id);
        const tasks = await Task.findByProject(req.params.id);
        res.render('projects/view', { project, members, tasks });
    }

    async addMember(req, res) {
        const { user_id } = req.body;
        await ProjectMember.addMember(req.params.id, user_id);
        res.redirect(`/projects/${req.params.id}`);
    }

    // Show edit form
    async showEdit(req, res) {
        const project = await Project.findById(req.params.id);
        res.render('projects/edit', { project });
    }

    // Handle edit form
    async edit(req, res) {
        const { name, description } = req.body;
        await Project.update(req.params.id, { name, description });
        res.redirect(`/projects/${req.params.id}`);
    }

    // Delete project
    async delete(req, res) {
        const projectId = req.params.id;
        // Delete related tasks and members first
        await Project.deleteRelated(projectId);
        await Project.delete(projectId);
        res.redirect('/projects');
    }
}

module.exports = new ProjectController();