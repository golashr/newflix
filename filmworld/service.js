// const dotenv = require('dotenv');
// const path = require('path');
const logger = require('./logger/logger');
const config = require('./config/config');
logger.info(`Environment Variables ${config.mongodb.port} ${config.mongodb.host} ${config.mongodb.port} ${config.mongodb.dbName} ${config.mongodb.collectionName}`);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
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
