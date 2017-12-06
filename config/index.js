/*jshint multistr: true ,node: true*/
'use strict';

var rmqCOnfig = {
	ENVIRONMENT : process.env.NODE_ENV || 'development',
	development : {
		RABBITMQ : {
			CONNECT_STRING : 'amqp://guest:guest@localhost:5672?heartbeat=60',
			RETRY : 5000 //milliseconds
		}
	}
};

module.exports =  rmqCOnfig;