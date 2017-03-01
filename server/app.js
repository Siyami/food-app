'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(morgan('short'));
app.use(bodyParser.json());
app.disable('x-powered-by');
app.use(cookieParser());

const authorize = function(req, res, next) {
 jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
   if (err) {
     return next(boom.create(401, 'Unauthorized'));
   }

   req.claim = payload;

   next();
 });
};

app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/token'));
app.use('/api', require('./routes/exercises'));
// app.use('/api', require('/.routes/summary'));
app.use('/api', authorize, require('./routes/meals'));


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

module.exports = app;
