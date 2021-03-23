const express = require('express');

const {
  getMessages,
  createSocketMessage,
  getMessage,
  deleteMessage,
  createSingleMessage,
} = require('../controllers/messages');

const router = express.Router();

// manage messages
router.route('/').get(getMessages).post(createSocketMessage);

router.route('/create').post(createSingleMessage);

router.route('/:id').get(getMessage).delete(deleteMessage);

module.exports = router;
