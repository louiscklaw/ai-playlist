const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, printf, splat } = format;
const path = require('path');

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message} `;
  if (metadata) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const myLogger = winston.createLogger({
  level: 'info',
  format: combine(
    format.colorize(),
    splat(),
    label({ label: 'jobsdb-scraper' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat,
  ),
  transports: [
    new transports.Console({ level: 'info' }),
    new winston.transports.File({ filename: '/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: '/logs/combined.log' }),
  ],
});

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     }),
//   );
// }

module.exports = { myLogger };
