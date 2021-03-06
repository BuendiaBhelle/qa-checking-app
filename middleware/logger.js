const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, json } = format;

async function errorLog() {
    module.exports.logger = createLogger({
        format: combine(
            timestamp(),
            json()
        ),
        transports: [
            new winston.transports.File({ filename: './middleware/logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: './middleware/logs/combined.log' }),
        ]
    });
}

module.exports = { errorLog };
