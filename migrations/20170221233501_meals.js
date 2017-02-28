'use strict';

exports.up = function(meals) {
  return knex.schema.createTable('meals', (table) => {
    table.increments();
    table.integer('user_id');
    table.string('date').notNullable().defaultTo('');
    table.text('photo').notNullable().defaultTo('');
    table.decimal('calories');
    table.decimal('protein');
    table.decimal('fat');
    table.decimal('totalcarbs')
    table.decimal('fiber')
    table.decimal('sugars')
    table.timestamps(true, true);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTable('meals');
};
