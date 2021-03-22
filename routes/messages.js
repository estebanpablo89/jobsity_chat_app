const express = require('express');

const {
  getMessages,
  createMessage,
} = require('../controllers/messages');

const router = express.Router();

// manage messages
router.route('/').get(getMessages).post(createMessage);

module.exports = router;
