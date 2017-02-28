'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('exercises', (table) => {
    table.increments();
    table.integer('user_id');
    table.string('date').notNullable().defaultTo('');
    table.text('photo');
    table.string('exercise').notNullable().defaultTo('');
    table.string('calories');
    table.string('duration');
    table.timestamps(true, true);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTable('exercises');
};
