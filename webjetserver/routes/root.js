const express = require('express');
const logger = require('../logger/logger');
var { successResponse } = require('../utils/utils');
var twoFactorAuthentication = require('../controllers/twofactorauthentication');

// eslint-disable-next-line new-cap
const router = express.Router();

/** @description Router GET call with '/' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/', (request, response) => {
  logger.info('[+] In the root');
  return successResponse(response, '<h1>Hello from Webjet Service!</h1>');
});

/** @description Router GET call with '/createQR' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/createQR', (request, response) => {
  logger.info('[+] In the createQR');
  twoFactorAuthentication
    .twoFactorAuthentication()
    .then((secret, imageURI) => {
      logger.info('[+] New QR is created from the Webject Service!');
      return successResponse(response, secret, imageURI);
    })
    .catch(error => {
      logger.error(`[+] The service returned error ${error}`);
      return errorResponse(
        response,
        '<h1>Webject World service failed while getting QR Code.</h1>'
      );
    });
});

/** @description Router GET call with '/verify2FA' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/verify2FA', (request, response) => {
  logger.info('[+] In the verify2FA');
  twoFactorAuthentication
    .verifyQR(request.query.secret, request.query.token)
    .then(verified => {
      logger.info('[+] New QR is created from the Webject Service!');
      return successResponse(
        response,
        '<h1>QR Code is verified with Webjet Service!</h1>',
        verified
      );
    })
    .catch(error => {
      logger.error(`[+] The service returned error ${error}`);
      return errorResponse(response, '<h1>QR Code verification failed!</h1>');
    });
});

module.exports = router;
