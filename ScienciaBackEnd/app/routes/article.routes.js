const { authJwt } = require("../middleware");
const controller = require("../controllers/article.controller");
const upload = require("../middleware/uploadPhotoArticle");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/article/getAll", [authJwt.verifyToken], controller.findAll);

  app.post("/api/article/getById", [authJwt.verifyToken], controller.findOneById);
  
  app.post("/api/article/create", [authJwt.verifyToken], controller.create);

  app.post("/api/article/uploadImageArticle", [authJwt.verifyToken], upload.single("file"), controller.uploadImage);

  app.post("/api/article/update", [authJwt.verifyToken], controller.update);

  app.post("/api/article/deleteAll", [authJwt.verifyToken], controller.deleteAll);

  app.post("/api/article/delete", [authJwt.verifyToken], controller.delete);

};