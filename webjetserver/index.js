const express = require('express');
var cors = require('cors');

const app = express();

require('log-timestamp')(function() {
  return '[' + new Date().toISOString() + '] %s';
});

const apiRoutes = require('./routes/api');
const rootRoutes = require('./routes/root');

app.use(express.json());
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With, Content-Type, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use('/api', apiRoutes);
app.use(rootRoutes);

module.exports = app;
