const Message = require('../models/Message');
const createBotTask = require('../chat_bot/bot');
const workBotTask = require('../chat_bot/worker');

exports.getMessages = (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
    .sort([['date', 1]])
    .limit(50);
};

exports.createMessage = (req, res) => {
  const message = new Message(req.body);
  if (message.message.startsWith('/stock=')) {
    createBotTask(message.message.split('=')[1]).then(
      workBotTask(botResponse => {
        global.io.emit('message', {
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

      global.io.emit('message', req.body);
      res.sendStatus(200);
    });
  }
};
