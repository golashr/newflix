module.exports = {
  server: {
    port: process.env.PORT || 3002,
    https: false
  },
  mongodb: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || '27017',
    dbName: process.env.MONGO_DB || 'cinemaWorld',
    collectionName: 'cinemaWorld'
  }
};
