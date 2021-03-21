const express = require('express');
const { welcome } = require('../controllers/index');

const router = express.Router();

router.route('/').get(welcome);

module.exports = router;
