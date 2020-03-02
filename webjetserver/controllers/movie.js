// const { successResponse, errorResponse } = require('../utils/utils');
const logger = require('../logger/logger');
const { axios, CancelToken } = require('axios');
const config = require('../config/config');

/** @description Retrieve the login token from the given service.
 * @param {url} URL of the remote service
 * @return {response data}
 */

exports.getLoginToken = url => {
  logger.info(`[+] Login token to retrieve from ${url}`);
  return new Promise(function(resolve, reject) {
    let source = CancelToken.source();
    setTimeout(() => {
      source.cancel();
    }, 300);
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        timeout: 2000,
        cancelToken: source.token
      })
      .then(response => {
        logger.info('[+] The login token retrieved from the given service.');
        resolve(response.data);
      })
      .catch(error => {
        logger.error(
          `[+] The service returned error with the given ID. ${error}`
        );
        reject(error);
      });
  });
};

/** @description Retrieve the movie(s) against the ID from the given service.
 * @param {url} request from the remote service
 * @param {token} authenticaion JWT token of the remote service app
 * @return {response data}
 */

exports.getMovieRemoteWithToken = (url, token, ID) => {
  logger.info(`[+] Movie ID ${ID} to look from ${url}`);
  const authToken = `${config.AUTH_TOKEN}${token}`;
  return new Promise(function(resolve, reject) {
    let source = CancelToken.source();
    setTimeout(() => {
      source.cancel();
    }, 300);
    axios
      .get(url, {
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        params: {
          ID
        },
        timeout: 2000,
        cancelToken: source.token
      })
      .then(response => {
        logger.info('[+] The movie exists with the given ID with service.');
        resolve(response.data);
      })
      .catch(error => {
        logger.error(
          `[+] The service returned error with the given ID. ${error}`
        );
        reject(error);
      });
  });
};

/** @description Retrieve the movie(s) against the ID from the given service.
 * @param {url} request from the remote service
 * @param {token} authenticaion JWT token of the remote service app
 * @return {response data}
 */

exports.getMoviesRemoteWithToken = (url, token) => {
  logger.info(`[+] Movies to retrieve from ${url}`);
  const authToken = `${config.AUTH_TOKEN}${token}`;
  return new Promise(function(resolve, reject) {
    let source = CancelToken.source();
    setTimeout(() => {
      source.cancel();
    }, 300);
    axios
      .get(url, {
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        timeout: 2000,
        cancelToken: source.token
      })
      .then(response => {
        logger.info('[+] The movies retrieved from the service.');
        resolve(response.data);
      })
      .catch(error => {
        logger.error(
          `[+] The service returned error with the given ID. ${error}`
        );
        reject(error);
      });
  });
};

/** @description Retrieve the movie(s) against the ID from the given service.
 * @param {baseUrl} request from the remote service
 * @param {ID} ID to be searched from the remote service
 * @return {promise response with movies}
 */

exports.getMovieRemote = (baseUrl, ID) => {
  logger.info(`[+] Movies to retrieve from ${baseUrl}`);
  return new Promise(function(resolve, reject) {
    exports.getLoginToken(`${baseUrl}/api/login`).then(token => {
      logger.info('[+] The token retrieved with cinmeworld service.');
      exports
        .getMovieRemoteWithToken(`${baseUrl}/movie/movie`, token.data, ID)
        .then(movies => {
          logger.info('[+] The movie exists with the given ID with service.');
          resolve(movies.data);
        })
        .catch(error => {
          logger.error(
            `[+] The service returned error with the given ID ${error}`
          );
          reject(error);
        });
    });
  });
};

/** @description Retrieve the movies from the given service.
 * @param {baseUrl} request from the remote service
 * @return {promise response with movies}
 */

exports.getMoviesRemote = baseUrl => {
  logger.info(`[+] Movies to retrieve from ${baseUrl}`);
  return new Promise(function(resolve, reject) {
    exports.getLoginToken(`${baseUrl}/api/login`).then(token => {
      // logger.info(`[+] The token retrieved with the service ${token.data}`);
      exports
        .getMoviesRemoteWithToken(`${baseUrl}/movie/movies`, token.data)
        .then(movies => {
          logger.info('[+] All the movies are retrieved with service.');
          resolve(movies.data);
        })
        .catch(error => {
          logger.error(
            `[+] The service returned error while retrieving movies ${error}`
          );
          reject(error);
        });
    });
  });
};
