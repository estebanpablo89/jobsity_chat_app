var amqp = require('amqplib');

amqp
  .connect('amqp://localhost')
  .then(function (conn) {
    return conn
      .createChannel()
      .then(function (ch) {
        var q = 'task_queue';
        var ok = ch.assertQueue(q, { durable: true });

        return ok.then(function () {
          var msg = message;
          ch.sendToQueue(q, Buffer.from(msg), {
            deliveryMode: true,
          });
          console.log(" [x] Sent '%s'", msg);
          return ch.close();
        });
      })
      .finally(function () {
        conn.close();
      });
  })
  .catch(console.warn);

module.exports = createBotTask;
