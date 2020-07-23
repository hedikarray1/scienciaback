const { authJwt } = require("../middleware");
const controller = require("../controllers/formation.controller");

const uploadPdf = require("../middleware/uploadPDF");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/formation/getAll",[authJwt.verifyToken], controller.findAll);

  app.post("/api/formation/getById",[authJwt.verifyToken], controller.findOneById);
  app.post("/api/formation/create",[authJwt.verifyToken], controller.create);
  app.post("/api/formation/getByNom",[authJwt.verifyToken], controller.findByNom);
  app.post("/api/formation/getByType",[authJwt.verifyToken], controller.findByType);

  app.post("/api/formation/uploadPdf",[authJwt.verifyToken], uploadPdf.single("file"), controller.uploadPdf);

  app.post("/api/formation/update",[authJwt.verifyToken], controller.update);
  app.delete("/api/formation/deleteAll",[authJwt.verifyToken], controller.deleteAll);

  app.post("/api/formation/delete",[authJwt.verifyToken], controller.delete);

};