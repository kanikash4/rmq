var amqp = require('amqplib/cb_api');

var rmq = function (name, conf) {
  return {
    emit: function (data, close=true) {
      amqp.connect(`amqp://${conf.server.user}:${conf.server.pass}@${conf.server.host}:${conf.server.port}`, function (err, conn) {
          conn.createChannel(function (err, ch) {
              var msg = JSON.stringify(data);
              ch.assertQueue(name, conf.queue);
              ch.sendToQueue(name, new Buffer(msg));
          });
          if (close) {
              setTimeout(function () {
                  conn.close();
                  process.exit(0);
              }, 500);
          }
      });
    },
    receive: function (cb) {
      amqp.connect(`amqp://${conf.server.user}:${conf.server.pass}@${conf.server.host}:${conf.server.port}`, function (err, conn) {
          conn.createChannel(function (err, ch) {
              ch.assertQueue(name, conf.queue);
              console.log(new Date().toString() + ' Queue ' + name + ' initialized');
              ch.consume(name, function (msg) {
                  console.log(new Date().toString() + " Received %s", msg.content.toString());
                  if (cb) {
                      cb(JSON.parse(msg.content.toString()), msg.fields.routingKey);
                  }
                  if (conf.consumer.noAck === false) {
                      ch.ack(msg);
                  }
              }, conf.consumer);
          });
      });
    }
  };
};

module.exports = rmq;
