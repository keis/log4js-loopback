## log4js-loopback

This appender lets you use the usual set of log4js goodies like filtering on
category or log level in combination with multiprocessing logging.

Configure multiprocess to use loopback as it's append and get logging!

```yaml
    appenders:
        - { type: "multiprocess",
            mode: "master",
            appender: { type: "log4js-loopback" } }
        - { type: 'console' }
        - { type: 'file'
            filename: "logs/access.log",
            category: "access" }
        - { type: 'logLevelFilter',
            level: "WARN",
            appender: { type: 'file',
                        filename: "logs/error.log" } }
```

`log4js-loopback` does this by emitting each log event recieved through the
full log4js machinery but taking care not to loop each event more than once.
