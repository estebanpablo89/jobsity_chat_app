const Message = require('../models/Message');
const chatbot = require('../chat_bot/bot');

exports.getMessages = (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
    .sort([['date', 1]])
    .limit(50);
};

exports.createMessage = (req, res) => {
  var message = new Message(req.body);
  if (message.message.startsWith('/stock=')) {
    console.log('command used');
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
