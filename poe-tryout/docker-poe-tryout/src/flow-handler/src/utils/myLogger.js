const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    winston.format.json(),
    timestamp(),
    // prettyPrint()
  ),
  defaultMeta: { service: 'flow-handler' },
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

module.exports = { myLogger: logger };
