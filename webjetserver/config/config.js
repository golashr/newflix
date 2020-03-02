const path = require('path');
// eslint-disable-next-line no-path-concat
require('dotenv').config({ path: path.resolve(__dirname + '/../.env') });

module.exports = {
  server: {
    port: process.env.PORT || 3001,
    https: false
  // eslint-disable-next-line no-inline-comments
  },
  cinemaworldBaseURL: `${process.env.CINEMAWORLD_HOST}:${process.env.CINEMAWORLD_PORT}`,
  filmworldBaseURL: `${process.env.FILMWORLD_HOST}:${process.env.FILMWORLD_PORT}`,
  AUTH_TOKEN: 'Bearer '
};
