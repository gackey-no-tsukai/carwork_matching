const knex = require("knex");
const knexConfig = require("./knexfile");

// console.log(process.env.NODE_ENV);
// const env = process.env.NODE_ENV;

module.exports = knex(knexConfig);
