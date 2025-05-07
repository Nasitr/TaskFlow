const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const requireAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
};

router.get('/team', requireAuth, teamController.list);

module.exports = router;
