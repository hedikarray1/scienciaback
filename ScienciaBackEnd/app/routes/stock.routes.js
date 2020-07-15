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

  app.get("/api/stock/getAll", controller.findAll);

  app.post("/api/stock/getById", controller.findOneById);
  app.post("/api/stock/create", controller.create);
  app.post("/api/stock/getByNom", controller.findByNom);
  app.post("/api/stock/getByType", controller.findByType);

  app.post("/api/stock/uploadImageStock", upload.single("file"), controller.uploadImage);

  app.post("/api/stock/update", controller.update);
  app.delete("/api/stock/deleteAll", controller.deleteAll);

  app.post("/api/stock/delete", controller.delete);

};