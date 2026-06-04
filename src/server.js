const express = require("express");
const path = require("path");
const knex = require("../knex");

function setupServer() {
  const app = express();
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.json());

  app.get("/api", async (req, res) => {
    const data = await knex("card");
    res.send(data);
  });

  app.get("/api/:id", async (req, res) => {
    const data = await knex("card").where("id", Number(req.params.id)).first();
    console.log(data);
    res.send(data);
  });

  app.post("/api/input", async (req, res) => {
    const newData = req.body;
    const insertData = await knex("card").insert(newData, ["*"]);

    res.send(insertData);
  });

  app.delete("/api/:id", async (req, res) => {
    const id = req.params.id;
    const deleteData = await knex("card").where("id", Number(id)).del(["*"]);

    res.send(deleteData);
  });

  return app;
}

module.exports = {
  setupServer,
};
