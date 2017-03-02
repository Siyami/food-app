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
      user_id:req.claim.userId,
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

router.delete('/exercises/:id', (req, res, next) => {
  let exercise;

  knex('exercises')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }
      exercise = row;
      return knex('exercises')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete exercise.id;
      res.send(exercise);
    })
    .catch((err) => {
      next(err)
    });
});

module.exports = router
