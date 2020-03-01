const express = require('express');
const app = express();
const db = require('./components/db');
var cors = require('cors');

require('log-timestamp')(function() {
  return '[' + new Date().toISOString() + '] %s';
});

const apiRoutes = require('./routes/api');
const movieRoutes = require('./routes/movie');
const rootRoutes = require('./routes/root');

app.use(express.json());
app.use(cors());

app.use('/api', apiRoutes);
app.use('/movie', movieRoutes);
app.use(rootRoutes);

db.connect().then(() => {
  db.initializeDatabase();
});

module.exports = app;
