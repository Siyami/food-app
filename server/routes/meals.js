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

  const { saturatedFat, sodium, carbonhydrate, sugar, fiber, protein, totalFat, mealCalories } = req.body.totals;
  const { mealDate } = req.body;

  const insertMeal = { user_id:req.claim.userId, mealDate, saturatedFat, sodium, carbonhydrate, sugar, fiber, protein, totalFat, mealCalories };

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
