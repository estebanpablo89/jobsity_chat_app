const Message = require('../models/Message');
const createBotTask = require('../chat_bot/bot');
const workBotTask = require('../chat_bot/worker');

exports.getMessages = (req, res) => {
  Message.find({ room: req.query.room }, (err, messages) => {
    res.send(messages);
  })
    .sort([['date', 1]])
    .limit(50);
};

exports.deleteMessage = async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    res.status(400).json({
      success: true,
      error: 'Message not found',
    });
  } else {
    await message.remove();
    res.status(200).json({
      success: true,
      data: {},
    });
  }
};

exports.getMessage = (req, res) => {
  Message.findOne({ id: req.query.id }, (err, message) => {
    res.send(message);
  });
};

exports.createSingleMessage = async (req, res) => {
  const message = await Message.create(req.body);
  res.status(201).json({
    success: true,
    data: message,
  });
};

exports.createSocketMessage = (req, res) => {
  const message = new Message(req.body);
  if (message.message.startsWith('/stock=')) {
    createBotTask(message.message.split('=')[1]).then(
      workBotTask(botResponse => {
        global.io.to(message.room).emit('message', {
          user: 'chat_bot',
          message: botResponse,
        });
      })
    );
  } else {
    message.save(err => {
      if (err) {
        console.log(err);
      }
      global.io.to(message.room).emit('message', req.body);
      res.status(200);
    });
  }
};
