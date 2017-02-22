'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/food_dev'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
