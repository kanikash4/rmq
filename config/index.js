/*jshint multistr: true ,node: true*/
'use strict';

var rmqCOnfig = {
	ENVIRONMENT : process.env.NODE_ENV || 'development',
  COMMON : {
    QUIET_MODE : true,
    }
	development : {
		RABBITMQ : {
			CLOUDAMQP_URL : 'amqp://guest:guest@localhost:5672?heartbeat=60',
			RETRY : 5000
		}
	},
	production : {
		RABBITMQ : {
			CLOUDAMQP_URL : 'amqp://guest:guest@localhost:5672?heartbeat=60',
			RETRY : 5000 //milliseconds
		}
	}
};

var loadConfig = function() {
	var env = rmqCOnfig.ENVIRONMENT,
	    loadedConfig = config.COMMON;

	if(["development", "production"].indexOf(env) <= -1) {
		env = "development";
	}

	Object.keys(rmqCOnfig[env]).forEach(function(key) {
		loadedConfig[key] = config[env][key];
	});
	return loadedConfig;
};

module.exports = loadConfig();
