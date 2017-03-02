'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const router = express.Router();

router.get('/users_meals_exercises', (req, res, next) => {
  let meals;
  let exercises;
  knex('users')
    .innerJoin('meals', 'users.id', 'meals.user_id')
    .where('users.id', req.claim.userId)
    .orderBy('date')
    .then((rows) => {
      meals = rows;
      return knex('users')
        .innerJoin('exercises', 'users.id', 'exercises.user_id')
        .where('users.id', req.claim.userId)
        .orderBy('date')
    })
    .then((rows) => {
      exercises = rows;
      res.send([meals, exercises])
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
