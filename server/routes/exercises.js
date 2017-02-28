'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();

router.get('/exercises', (_req, res, next) => {
  knex('exercises')
    .orderBy('created_at', 'desc')
    .then((rows) => {
      const exercises = rows;

      res.send(exercises);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/exercises', (req, res, next) => {
  knex('exercises')
    .insert({
      date: req.body.date,
      photo: req.body.photo,
      exercise: req.body.exercise,
      duration: req.body.duration,
      calories: req.body.calories
    }, '*')
    .then((exercises) => {
      res.send(exercises[0]);
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router
