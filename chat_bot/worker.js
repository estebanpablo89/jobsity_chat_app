var amqp = require('amqplib');
const request = require('request');

const workBotTask = callback => {
  return new Promise((resolve, reject) => {
    amqp
      .connect('amqp://localhost')
      .then(function (conn) {
        process.once('SIGINT', function () {
          conn.close();
        });
        return conn.createChannel().then(function (ch) {
          var ok = ch.assertQueue('task_queue', { durable: true });
          ok = ok.then(function () {
            ch.prefetch(1);
          });
          ok = ok.then(function () {
            ch.consume('task_queue', doWork, { noAck: false });
            console.log(
              ' [*] Waiting for messages. To exit press CTRL+C'
            );
          });
          return ok;

          function doWork(msg) {
            var body = msg.content.toString();
            console.log(" [x] Received '%s'", body);

            const url = `https://stooq.com/q/l/?s=${body}&f=sd2t2ohlcv&h&e=csv`;
            let botResponse;
            request(url, function (error, response, body) {
              if (!error) {
                const data = body.split('\r\n')[1].split(',');
                if (data[3] === 'N/D') {
                  botResponse = 'not data found';
                } else {
                  botResponse = `${data[0]} quote is $${data[3]} per share`;
                }
              } else {
                throw new Error(error);
              }
            });

            var secs = body.split('.').length - 1;
            setTimeout(function () {
              console.log(' [x] Done');
              ch.ack(msg);
              callback(botResponse);
            }, secs * 1000);
          }
        });
      })
      .catch(console.warn);
  });
};

module.exports = workBotTask;
