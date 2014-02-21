'use strict';

var log4js = require('log4js'),
    sentinel = {};

function loopbackAppender() {
    return function (loggingEvent) {
        var logger = log4js.getLogger(loggingEvent.categoryName),
            isRemote = !!loggingEvent.remoteAddress,
            hasLooped = loggingEvent._loopback === sentinel;

        if (!hasLooped && isRemote) {
            loggingEvent._loopback = sentinel;
            logger.emit("log", loggingEvent);
        }
    };
}

function configure(config, options) {
    return loopbackAppender();
}

exports.appender = loopbackAppender;
exports.configure = configure;
