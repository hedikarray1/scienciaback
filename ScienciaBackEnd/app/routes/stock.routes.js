const { authJwt } = require("../middleware");
const controller = require("../controllers/stock.controller");
const upload = require("../middleware/uploadPhotoStock");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/stock/getAll", [authJwt.verifyToken], controller.findAll);

  app.post("/api/stock/getById", [authJwt.verifyToken], controller.findOneById);
  app.post("/api/stock/create", [authJwt.verifyToken], controller.create);
  app.post("/api/stock/getByNom", [authJwt.verifyToken], controller.findByNom);
  app.post("/api/stock/getByType", [authJwt.verifyToken], controller.findByType);

  app.post("/api/stock/uploadImageStock", [authJwt.verifyToken], upload.single("file"), controller.uploadImage);

  app.post("/api/stock/update", [authJwt.verifyToken], controller.update);

  app.post("/api/stock/updateQuantite", [authJwt.verifyToken], controller.updateQuantite);
  
  app.delete("/api/stock/deleteAll", [authJwt.verifyToken], controller.deleteAll);

  app.post("/api/stock/delete", [authJwt.verifyToken], controller.delete);

};