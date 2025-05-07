const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
// const requireAuth = require('../middleware/requireAuth');

const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

// Show the create task form
router.get('/projects/:projectId/tasks/create', requireAuth, taskController.showCreate);

// Handle the create task form submission
router.post('/projects/:projectId/tasks/create', requireAuth, taskController.create);

router.post('/tasks/:id/progress', requireAuth, taskController.updateStatus);

// Edit and delete routes
router.get('/tasks/:id/edit', requireAuth, taskController.showEdit);
router.post('/tasks/:id/edit', requireAuth, taskController.edit);
router.post('/tasks/:id/delete', requireAuth, taskController.delete);

module.exports = router;