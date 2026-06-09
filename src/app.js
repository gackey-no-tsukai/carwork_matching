const express = require("express");
const knex = require("../knex");
const path = require("path");
const multer = require("multer");
const upload = multer();
const { initPosts } = require("./Posts/index");
const { initUsers } = require("./Users/index");
const { uploadPhoto, s3GetSignedUrl } = require("../utils");
const {
  toggleSignIn,
  handleSignUp,
  toggleSignOut,
} = require("./firebase/index");

function buildApp() {
  const app = express();

  app.use(express.static(path.join(__dirname, "../public")));

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

  //Detail.jsxで使用
  app.get("/api/posts", PostsController.read);
  app.get("/api/posts/:id", validateIdMiddleware, PostsController.find);

  app.get("/api/photos", async (req, res) => {
    // const user_id = req.query["user_id"];
    // console.log("スタート", user_id);
    try {
      const user_data = await knex("posts").select("picture");
      //   .where("user_id", user_id);
      // console.log(user_data);

      const result = await Promise.all(
        user_data.map(async (photo) => {
          console.log("photo", photo);
          if (photo.picture !== null) {
            const url = await s3GetSignedUrl(photo.picture);
            const res_object = await {
              url: url,
              // user_id: user_id,
              picture: photo.picture,
            };
            return res_object;
          }
        }),
      );

      console.log("result", result);
      res.status(200).json({ data: result });
      return;
    } catch (error) {
      res.status(500).json({ successe: false, data: "写真取得失敗" });
      return;
    }
  });

  app.patch(
    "/api/posts/join/:id",
    validateIdMiddleware,
    PostsController.update,
  );
  app.post("/api/create", PostsController.create);

  app.post("/api/photos", upload.any(), async (req, res) => {
    console.log("ファイルズ", req.files);
    const id = req.body.post_user_email;
    const file_name = req.files[0].originalname;
    try {
      const data = await uploadPhoto(
        req.files[0].buffer,
        req.files[0].originalname,
      );
      res.status(200).json({ successe: true, data: data, result: result });
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  });
  app.post("/api/login", async (req, res) => {
    const respons = await toggleSignIn(req.body.mail, req.body.password);
    res.json(respons);
  });

  app.post("/api/login/singup", async (req, res) => {
    const respons = await handleSignUp(req.body.mail, req.body.password);
    // const insert = UsersController.create(req, res);
    // console.log(insert);
    res.json(respons);
  });

  // app.get("/api/login/singout", async (req, res) => {
  //   await toggleSignOut();
  //   res.send("OK");
  // });
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
