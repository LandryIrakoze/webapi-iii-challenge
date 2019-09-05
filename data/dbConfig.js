const knex = require('knex');

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];

const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig.development);
