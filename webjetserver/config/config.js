module.exports = {
  server: {
    port: process.env.PORT || 3001,
    https: false
  // eslint-disable-next-line no-inline-comments
  },
  mongodb: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || '27017',
    dbName: 'webjetserver',
    collectionName: 'webjetserver'
  },
  cinemaworldBaseURL: 'http://localhost:3002',
  filmworldBaseURL: 'http://localhost:3003',
  AUTH_TOKEN: 'Bearer '
};
