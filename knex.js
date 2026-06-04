const config = require("./knexfile");
const knex = require("knex")(config);
const pg = require("pg");

pg.types.setTypeParser(1184, function (stringValue) {
  return stringValue;
});

module.exports = knex;
