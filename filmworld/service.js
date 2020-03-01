const dotenv = require('dotenv');
const logger = require('./logger/logger');
const path = require('path');
const config = require('./config/config');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if (process.env.NODE_ENV === 'dev') {
  logger.info(`Loading Environment Variables from ${process.env.NODE_ENV}.env`);
  dotenv.config({
    path: path.resolve(
      process.cwd(),
      `./environments/${process.env.NODE_ENV}/.env`
    )
  });
}

const server = require('./index');
server.listen(config.server.port, () => {
  logger.info(
    `[+] filmWorld server running on port ${config.server.port}`
  );
});
