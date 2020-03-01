module.exports = {
  server: {
    port: process.env.PORT || 3003,
    https: false
  },
  mongodb: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || '27017',
    dbName: 'filmWorld',
    collectionName: 'filmWorld'
  }
};
