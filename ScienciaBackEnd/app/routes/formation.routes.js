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

  app.get("/api/formation/getAll", controller.findAll);

  app.post("/api/formation/getById", controller.findOneById);
  app.post("/api/formation/create", controller.create);
  app.post("/api/formation/getByNom", controller.findByNom);
  app.post("/api/formation/getByType", controller.findByType);

  app.post("/api/formation/uploadPdf", uploadPdf.single("file"), controller.uploadPdf);

  app.post("/api/formation/update", controller.update);
  app.delete("/api/formation/deleteAll", controller.deleteAll);

  app.post("/api/formation/delete", controller.delete);

};