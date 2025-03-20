const express = require("express");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

// Login routes
router.get("/signin", AuthController.getLoginPage);
router.post("/signin", AuthController.loginUser);

// Sign-up routes
router.get("/signup", AuthController.getSignUpPage);
router.post("/signup", AuthController.signUpUser);

module.exports = router;