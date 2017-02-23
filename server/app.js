'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// const port = process.env.PORT || 8000;

// const users = require('./routes/users');
// const token = require('./routes/token');

app.use(morgan('short'));
app.use(bodyParser.json());
app.disable('x-powered-by');

// app.use(express.static(path.join('public')));

// app.use(users);
// app.use(meals);
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/token'));
// app.use('/api', require('./routes/meals'));

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

// app.listen(port, () => {
//   console.log('Listening on port', port);
// });

module.exports = app;
