'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const router = express.Router();

router.get('/meals', (_req, res, next) => {
  knex('meals')
    .orderBy('id')
    .then((rows) => {
      const meals = rows;

      res.send(meals);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/meals', (req, res, next) => {

  const { date, saturatedFat, sodium, carbonhydrate, sugar, fiber, protein, totalFat, calories } = req.body;

  // if (!title || !title.trim()) {
  //   return next(boom.create(400, 'Title must not be blank'));
  // }
  //
  // if (!author || !author.trim()) {
  //   return next(boom.create(400, 'Author must not be blank'));
  // }
  //
  // if (!genre || !genre.trim()) {
  //   return next(boom.create(400, 'Genre must not be blank'));
  // }
  //
  // if (!description || !description.trim()) {
  //   return next(boom.create(400, 'Description must not be blank'));
  // }
  //
  // if (!coverUrl || !coverUrl.trim()) {
  //   return next(boom.create(400, 'Cover URL must not be blank'));
  // }

  const insertMeal = { user_id:req.claim.userId, date, saturatedFat, sodium, carbonhydrate, sugar, fiber, protein, totalFat, calories };

  knex('meals')
    .insert(insertMeal, '*')
    .then((rows) => {
      const meal = rows[0];

      res.send(meal);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/meals/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  let meal;

  knex('meals')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      meal = row;

      return knex('meals')
        .del()
        .where('id', id);
    })
    .then(() => {
      delete meal.id;

      res.send(meal);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
