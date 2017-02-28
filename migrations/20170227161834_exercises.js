'use strict';

exports.up = function(exercises) {
  return knex.schema.createTable('exercises', (table) => {
    table.increments();
    table.integer('user_id');
    table.string('date').notNullable().defaultTo('');
    table.text('photo').notNullable().defaultTo('');
    table.string('exercise').notNullable().defaultTo('');
    table.integer('calories')
    table.integer('duration')
    table.timestamps(true, true);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTable('exercises');
};
