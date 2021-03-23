const express = require('express');

const {
  getMessages,
  createMessage,
  getMessage,
  deleteMessage,
  createSingleMessage,
} = require('../controllers/messages');

const router = express.Router();

// manage messages
router.route('/').get(getMessages).post(createMessage);

router.route('/create').post(createSingleMessage);

router.route('/:id').get(getMessage).delete(deleteMessage);

module.exports = router;
