const { createUsersRepository } = require("./Users.repository");
const { createUsersService } = require("./Users.service");
const { createUsersController } = require("./Users.controller");

function initUsers(knex) {
  const repository = createUsersRepository(knex);
  const service = createUsersService(repository);
  const controller = createUsersController(service);

  return controller;
}

module.exports = { initUsers };
