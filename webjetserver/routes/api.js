const express = require('express');
const logger = require('../logger/logger');
const { successResponse, errorResponse } = require('../utils/utils');
const jwt = require('jsonwebtoken');
const movieController = require('../controllers/movie');
const config = require('../config/config');
const { verifyAccessToken } = require('../utils/utils');

// eslint-disable-next-line new-cap
const router = express.Router();

/** @description Router GET call with '/api/ping' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */
router.get('/ping', (request, response) => {
  logger.info('[+] In the ping');
  return successResponse(response, '<h1>Pong from Webjetserver!</h1>');
});

/** @description Router POST call with '/api/login' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.post('/login', (request, response) => {
  logger.info('[+] In the login');
  const user = {
    id: 1,
    username: 'rahul',
    email: 'rahul.golash@gmail.com'
  };

  jwt.sign({ user }, 'secretkey', { expiresIn: '10m' }, (err, token) => {
    return successResponse(
      response,
      '<h1>The user exists with the Webjet-service.</h1>',
      token
    );
  });
});

/** @description Router GET call with '/cinemaworld/movie' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/cinemaworld/movie', verifyAccessToken, (request, response) => {
  logger.info('[+] In the cinemaworld/movie');
  movieController
    .getMovieRemote(`${config.cinemaworldBaseURL}`, request.query.ID)
    .then(movies => {
      logger.info(
        '[+] The movie exists with the given ID with Cinemaworld service'
      );
      return successResponse(
        response,
        '<h1>The movies are retrieved from filmworld service with the given ID.</h1>',
        movies
      );
    })
    .catch(error => {
      logger.error(`[+] The service returned error with the given ID ${error}`);
      return errorResponse(
        response,
        '<h1>Cinemaworld World service failed while getting movie.</h1>'
      );
    });
});

/** @description Router GET call with '/cinemaworld/movies' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/cinemaworld/movies', verifyAccessToken, (request, response) => {
  logger.info('[+] In the cinemaworld/movies');
  movieController
    .getMoviesRemote(`${config.filmworldBaseURL}`)
    .then(movies => {
      logger.info(
        '[+] The movie exists with the given ID with Cinemaworld service.'
      );
      return successResponse(
        response,
        '<h1>The movies retrieved from filmworld service.</h1>',
        movies
      );
    })
    .catch(error => {
      logger.error(`[+] The service returned error with the given ID ${error}`);
      return errorResponse(
        response,
        '<h1>Cinemaworld World service failed while getting movie.</h1>'
      );
    });
});

/** @description Router GET call with '/filmworld/movie' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/filmworld/movie', verifyAccessToken, (request, response) => {
  logger.info('[+] In the filmworld/movie');
  movieController
    .getMovieRemote(`${config.filmworldBaseURL}`, request.query.ID)
    .then(movies => {
      logger.info(
        '[+] The movie exists with the given ID with filmworld service.'
      );
      return successResponse(
        response,
        '<h1>The movies are retrieved from filmworld service with the given ID.</h1>',
        movies
      );
    })
    .catch(error => {
      logger.error(`[+] The service returned error with the given ID ${error}`);
      return errorResponse(
        response,
        '<h1>filmworld World service failed while getting movie.</h1>'
      );
    });
});

/** @description Router GET call with '/filmworld/movies' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/filmworld/movies', verifyAccessToken, (request, response) => {
  logger.info('[+] In the filmworld/movies');
  movieController
    .getMoviesRemote(`${config.filmworldBaseURL}`)
    .then(movies => {
      logger.info('[+] The movies retrieved from filmworld service.');
      return successResponse(
        response,
        '<h1>The movies retrieved from filmworld service.</h1>',
        movies
      );
    })
    .catch(error => {
      logger.error(
        `[+] The filmworld World service getmovies returned error ${error}`
      );
      return errorResponse(
        response,
        '<h1>The filmworld World service getmovies returned error.</h1>'
      );
    });
});

/** @description Router GET call with '/filmworld/getmovies' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/getmovies', verifyAccessToken, (request, response) => {
  logger.info('[+] In the getmovies');

  let promises = [];
  promises.push(
    movieController.getMoviesRemote(`${config.cinemaworldBaseURL}`),
    movieController.getMoviesRemote(`${config.filmworldBaseURL}`)
  );
  Promise.all(promises)
    .then(data => {
      for (let i = 0; i < data[1].length; i += 1) {
        data[0].push(data[1][i]);
      }
      return successResponse(
        response,
        '<h1>WebJet server retrieved movies from its vendor services.</h1>',
        data[0]
      );
    })
    .catch(error => {
      logger.error(
        `[+] The WebJet server returned error with the given ID ${error}`
      );
      return errorResponse(
        response,
        '<h1>WebJet server failed while getting movies.</h1>'
      );
    });
});

module.exports = router;
