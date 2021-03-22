const express = require('express');
const {
  login,
  register,
  createUser,
  logging,
  logout,
} = require('../controllers/users');

const router = express.Router();

// login page
router.route('/login').get(login).post(logging);

// register page
router.route('/register').get(register).post(createUser);

// logout
router.route('/logout').get(logout);

module.exports = router;
