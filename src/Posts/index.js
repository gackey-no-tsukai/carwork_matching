const { createPostsRepository } = require("./Posts.repository");
const { createPostsService } = require("./Posts.service");
const { createPostsController } = require("./Posts.controller");

function initPosts(knex) {
  const repository = createPostsRepository(knex);
  const service = createPostsService(repository);
  const controller = createPostsController(service);

  return controller;
}

module.exports = { initPosts };
