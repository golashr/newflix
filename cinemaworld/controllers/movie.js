const initialData = require('../models/initialdata');
const Movie = require('../models/movies');
const { successResponse, errorResponse } = require('../utils/utils');
const logger = require('../logger/logger');

/** @description Retrieve the movie(s) against the ID from the MongoDB.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

exports.getMovie = (request, response) => {
  logger.info(`[+] Movie ID to look for ${request.query.ID}`);
  Movie.find(
    {
      ID: request.query.ID
    },
    (err, movies) => {
      if (err) {
        logger.error(`[+] getMovie -- error getting movie ${err}`);
        return errorResponse(
          response,
          '<h1>Cinema World service failed while getting movie.</h1>'
        );
      } else {
        movies.forEach(movie => {
          logger.info(
            `[+] Cinema World service retrieved movie. ${movie.ID}, ${movie.title}, ${movie.description}, ${movie.imageUrl},${movie.broadcaster}, ${movie.charges}`
          );
        });
        logger.info(
          `[+] The movie exists with the given ID Cinema World service ${movies}`
        );
        return successResponse(
          response,
          '<h1>The movie exists with the given ID Cinema World service.</h1>',
          movies
        );
      }
    }
  );
};

/** @description Retrieve all movies from the MongoDB.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

exports.getMovies = (request, response) => {
  logger.info('[+] Movies to look from Cinemaworld Service');
  Movie.find((err, movies) => {
    if (err) {
      logger.error(`[+] getMovies -- error getting movies ${err}`);
      return errorResponse(
        response,
        '<h1>Cinema World service failed while getting movies.</h1>'
      );
    } else {
      movies.forEach(movie => {
        logger.info(
          `[+] Cinema World service retrieved movie. ${movie.ID}, ${movie.title}, ${movie.description}, ${movie.imageUrl}, ${movie.broadcaster}, ${movie.charges}`
        );
      });
      logger.info(
        `[+] Cinema World service returns all listed movies. ${movies}`
      );
      return successResponse(
        response,
        '<h1>Cinema World service returns all listed movies.</h1>',
        movies
      );
    }
  });
};

/** @description Add new movie to the MongoDB DB.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

exports.addMovie = (request, response) => {
    data = request.query;
    logger.info(
      `[+] Cinema World service added. ${data.ID}, ${data.title}, ${data.description}, ${data.imageUrl} ${data.charges}, ${data.broadcaster}`
    );
    var movie = new Movie();
    movie.ID = data.ID;
    movie.title = data.title;
    movie.description = data.description;
    movie.owner = data.owner;
    movie.imageUrl = data.imageUrl;
    movie.broadcaster = data.broadcaster;
    movie.charges = data.charges;
    movie.save(err => {
      if (err) {
        logger.error(`[+] addMovie -- error adding movie ${err}`);
        return errorResponse(
          response,
          '<h1>Cinema World service failed while adding movie.</h1>'
        );
      } else {
        logger.info(
          `[+] Cinema World service added movie successfully. ${movie.title}`
        );
        return successResponse(
          response,
          '<h1>Cinema World service returns all listed movies.</h1>',
          movie
        );
      }
    });
};

/** @description Add new movies from initial data to the MongoDB.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

 exports.addMovies = () => {
  initialData.forEach(data => {
    logger.info(
      `[+] Cinema World service added. ${data.ID}, ${data.title}, ${data.description}, ${data.imageUrl}, ${data.charges}, ${data.broadcaster}`
    );
    var movie = new Movie();
    movie.ID = data.ID;
    movie.title = data.title;
    movie.description = data.description;
    movie.owner = data.owner;
    movie.imageUrl = data.imageUrl;
    movie.broadcaster = data.broadcaster;
    movie.charges = data.charges;
    movie.save(err => {
      if (err) {
        logger.error(`[+] addMovie -- error adding movie ${err}`);
      } else {
        logger.info(
          `[+] Cinema World service added movie successfully. ${movie.title}`
        );
      }
    });
  });
};
