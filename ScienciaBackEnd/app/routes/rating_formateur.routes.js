const { authJwt } = require("../middleware");
const controller = require("../controllers/rating_formateur.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/rating_formateur/getAll",[authJwt.verifyToken], controller.findAll);
  app.post("/api/rating_formateur/getById",[authJwt.verifyToken], controller.findOneById);
  app.post("/api/rating_formateur/create",[authJwt.verifyToken], controller.create);

  app.post("/api/rating_formateur/getByIdEcole",[authJwt.verifyToken], controller.findByIdEcole);
  app.post("/api/rating_formateur/getByIdFormateur",[authJwt.verifyToken], controller.findByIdFormateur);

  app.post("/api/rating_formateur/getRatingFormateur",[authJwt.verifyToken], controller.calculRatingFormateur);
  app.post("/api/rating_formateur/getRatingFormateurEcole",[authJwt.verifyToken], controller.calculRatingFormateurEcole);

  app.delete("/api/rating_formateur/deleteAll",[authJwt.verifyToken], controller.deleteAll);
  app.delete("/api/rating_formateur/delete",[authJwt.verifyToken], controller.delete);

};