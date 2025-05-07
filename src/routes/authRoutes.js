const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Show login page
router.get('/login', authController.showLogin);

// Show registration page
router.get('/register', authController.showRegister);

// Handle login
router.post('/login', authController.login);

// Handle registration
router.post('/register', authController.register);

// Handle logout
router.get('/logout', authController.logout);

module.exports = router; 