#!/usr/bin/env node
var builder = require('../src/builder');

var server = {
    host: 'localhost',
    port: 5672,
    user: 'guest',
    pass: 'guest'
};

var queue = builder.queue('queue.backend', server);

// Emit 
queue.emit({aaa: 1});

// Receive
queue.receive(function (data) {
    console.log(data);
});

