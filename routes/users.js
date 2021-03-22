const express = require('express');
const {
  login,
  register,
  createUser,
  logging,
} = require('../controllers/users');

const router = express.Router();

// login page
router.route('/login').get(login).post(logging);

// register page
router.route('/register').get(register).post(createUser);

module.exports = router;
