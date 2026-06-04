/* You may need to fix this file */
require("dotenv").config();

const DB_USER = process.env.DB_USER;
const DB_NAME = "carwork_matching";
const DB_URL = process.env.DB_URL;

module.exports = {
  client: "postgresql",
  connection: DB_URL || {
    database: DB_NAME,
    user: DB_USER,
  },
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};
