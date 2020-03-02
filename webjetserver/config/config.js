module.exports = {
  server: {
    port: process.env.PORT || 3001,
    https: false
  // eslint-disable-next-line no-inline-comments
  },
  mongodb: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || '27017',
    dbName: process.env.MONGO_DB || 'webjetserver',
    collectionName: 'webjetserver'
  },
  cinemaworldBaseURL: `${process.env.CINEMAWORLD_HOST}:${process.env.CINEMAWORLD_PORT}`,
  filmworldBaseURL: `${process.env.FILMWORLD_HOST}:${process.env.FILMWORLD_PORT}`,
  AUTH_TOKEN: 'Bearer '
};
