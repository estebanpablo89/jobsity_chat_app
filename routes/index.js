const express = require('express');
const { ensureAuthenticated } = require('../config/auth');

const {
  welcome,
  dashboard,
  logout,
} = require('../controllers/index');

const router = express.Router();
// welcome page
router.route('/').get(welcome);

// dashboard
router.route('/dashboard').get(ensureAuthenticated, dashboard);
module.exports = router;
