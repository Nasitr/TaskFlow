const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
// const requireAuth = require('../middleware/requireAuth');
const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};
router.get('/projects', requireAuth, projectController.list);
router.get('/projects/create', requireAuth, projectController.showCreate);
router.post('/projects/create', requireAuth, projectController.create);
router.get('/projects/:id', requireAuth, projectController.view);
router.post('/projects/:id/add-member', requireAuth, projectController.addMember);

// NEW: Edit and Delete routes
router.get('/projects/:id/edit', requireAuth, projectController.showEdit);
router.post('/projects/:id/edit', requireAuth, projectController.edit);
router.post('/projects/:id/delete', requireAuth, projectController.delete);

module.exports = router;
