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

  app.get("/api/rating_formateur/getAll", controller.findAll);
  app.post("/api/rating_formateur/getById", controller.findOneById);
  app.post("/api/rating_formateur/create", controller.create);

  app.post("/api/rating_formateur/getByIdEcole", controller.findByIdEcole);
  app.post("/api/rating_formateur/getByIdFormateur", controller.findByIdFormateur);

  app.post("/api/rating_formateur/getRatingFormateur", controller.calculRatingFormateur);
  app.post("/api/rating_formateur/getRatingFormateurEcole", controller.calculRatingFormateurEcole);

  app.delete("/api/rating_formateur/deleteAll", controller.deleteAll);
  app.delete("/api/rating_formateur/delete", controller.delete);

};