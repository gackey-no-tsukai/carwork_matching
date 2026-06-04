const express = require("express");
const knex = require("../knex");

const { initPosts } = require("./Posts/index");
const { initUsers } = require("./Users/index");

function buildApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const PostsController = initPosts(knex);
  const UsersController = initUsers(knex);

  function validateIdMiddleware(req, res, next) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: `Invalid id parameter. Instead received "${req.params.id}" which is a type of "${typeof req.params.id}"`,
      });
    }
    next();
  }

  app.get("/api/posts", PostsController.read);
  // app.post("/api/posts", PostsController.update);
  // app.patch("/api/posts/:id", validateIdMiddleware, PostsController.update);
  // app.delete("/api/posts/:id", validateIdMiddleware, PostsController.remove);

  app.get("/api/users", UsersController.read);
  // app.get("/api/users/:id", validateIdMiddleware, UsersController.read);
  // app.post("/api/users", PostsController.update);
  // app.patch("/Users/:id", validateIdMiddleware, UsersController.update);
  // app.delete("/Users/:id", validateIdMiddleware, UsersController.remove);

  app.use((req, res) => res.status(404).json({ error: "Not Found" }));

  return app;
}

module.exports = { buildApp };
