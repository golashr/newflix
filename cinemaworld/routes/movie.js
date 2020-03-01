const express = require('express');
const { verifyToken } = require('../utils/utils');
const movieController = require('../controllers/movie');

// eslint-disable-next-line new-cap
const router = express.Router();

/** @description Router GET call with '/movie/movie' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/movie', verifyToken, movieController.getMovie);

/** @description Router GET call with '/movie/movies' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */
router.get('/movies', verifyToken, movieController.getMovies);

/** @description Router POST call with '/movie/addMovie' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */
router.post('/addMovie', movieController.addMovie);

module.exports = router;
