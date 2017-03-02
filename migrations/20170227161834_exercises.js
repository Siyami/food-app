'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('exercises', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.string('date').notNullable().defaultTo('');
    table.text('photo').notNullable().defaultTo('');
    table.string('exercise').notNullable().defaultTo('');
    table.decimal('calories').notNullable().defaultTo(0);
    table.decimal('duration').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('exercises');
};
