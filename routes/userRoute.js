const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    register,
    getUser,
    login,
    logout
} = require('../controllers/users');
const isAuth = require('../middlewares/Auth');
const Admin = require("../middlewares/Admin")
// Get all users
router.get('/all',isAuth, Admin,getAllUsers);

// Register new user
router.post('/register', register);

// login
router.post('/login', login);

// Get user by ID
router.get('/user', isAuth, getUser);

// logout
router.get('/logout', logout);


module.exports = router;
