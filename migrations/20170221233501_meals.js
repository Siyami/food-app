'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('meals', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.string('mealDate').notNullable().defaultTo('');
    table.decimal('saturatedFat').notNullable().defaultTo(0);
    table.decimal('sodium').notNullable().defaultTo(0);
    table.decimal('carbonhydrate').notNullable().defaultTo(0);
    table.decimal('sugar').notNullable().defaultTo(0);
    table.decimal('fiber').notNullable().defaultTo(0);
    table.decimal('protein').notNullable().defaultTo(0);
    table.decimal('totalFat').notNullable().defaultTo(0);
    table.decimal('mealCalories').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('meals');
};
