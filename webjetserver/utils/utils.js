/** @description Enriched Success response for the client
 * @param {response} request from the client app
 * @param {message} message string for the client app
 * @param {data} response object for the client app
 * @return {response object}
 */

const successResponse = (response, message = null, data = null) => {
  response.status(200).send({
    success: true,
    timestamp: Date.now(),
    message,
    data
  });
};

/** @description Enriched error response for the client
 * @param {response} request from the client app
 * @param {message} message string for the client app
 * @param {status} 403 status for the client app
 * @return {response object}
 */

const errorResponse = (response, message, status = 403) => {
  response.status(status).send({
    success: false,
    timestamp: Date.now(),
    message
  });
};

/** @description FORMAT OF TOKEN x-access-token
 * @param {response} request from the client app
 * @param {message} message string for the client app
 * @param {status} 403 status for the client app
 * @return {response object}
 */

const verifyAccessToken = (request, response, next) => {
  // Get auth header value
  // eslint-disable-next-line space-infix-ops
  const webjetServerHeader = request.headers['x-access-token'];

  // Check if webjetServer is undefined
  if (typeof webjetServerHeader !== 'undefined') {
    if (webjetServerHeader === 'sjd1HfkjU83ksdsm3802k') {
      // Next middleware
      // eslint-disable-next-line callback-return
      next();
    }
  } else {
    errorResponse(response, 'Forbidden');
  }
};

exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
exports.verifyAccessToken = verifyAccessToken;
