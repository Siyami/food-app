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
    .insert(params(req))
    .returning('*')
    .then(posts => res.json(posts[0]))
    .catch(err => next(err))
    })
    .then((exercises) => {
      const exercise = exercises[0];

      res.send(exercise);
    })
    .catch((err) => {
      next(err);
    });

function params(req) {
  return {
    id: req.body.id,
    date: req.body.date,
    photo: req.body.photo,
    exercise: req.body.exercise,
    duration: req.body.duration,
    user_id: req.body.user_id
  }
}
