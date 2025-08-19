const express = require('express');
const router = express.Router();
const userController = require("../modules/controllers/authController");

// POST /auth/register
router.post('/register', userController.registerUser);


// POST /auth/login
router.post('/login', userController.loginUser);

module.exports = router;