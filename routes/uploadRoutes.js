const express = require("express");
const router = express.Router();
const homeController = require("../controller/home");
const uploadController = require("../controller/upload");
const upload = require("../middleware/middleware");

let routes = (app) => {
  router.get("/", homeController.getHome);

  router.post("/upload", upload.single("file"), uploadController.uploadFiles);

  return router.use("/", router);
};

module.exports = routes;
