'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');

const router = express.Router();

router.get('/summary', (req, res, next) => {
  knex
    .select('*')
    .from('meals')
    .join('exercises', () => {
      this.on('meals.user_id', '=', 'exercises.user_id')
      .then((rows) => {
        const summary = rows;

        res.send(summary)
      })
      .catch((err) => {
        next(err)
      })
    })

});


// router.get('/meals', (_req, res, next) => {
//   knex('meals')
//     .orderBy('id')
//     .then((rows) => {
//       const meals = rows;
//
//       res.send(meals);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });



module.exports = router
