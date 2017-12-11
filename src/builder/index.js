var defaults = {
    queue: {
        queue: {
            passive: false,
            durable: true,
            exclusive: false,
            autoDelete: false,
            nowait: false
        },
        consumer: {
            noLocal: false,
            noAck: false,
            exclusive: false,
            nowait: false
        }
    }
};

module.exports = {
    queue: function (name, server) {
        var conf = defaults['queue'];
        conf['server'] = server;
        return require('../queue')(name, conf);
    }
};