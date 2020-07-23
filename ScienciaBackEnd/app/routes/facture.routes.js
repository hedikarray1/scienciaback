const { authJwt } = require("../middleware");
const controller = require("../controllers/facture.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/facture/getAll",[authJwt.verifyToken], controller.findAll);
  app.post("/api/facture/getById",[authJwt.verifyToken], controller.findOneById);
  app.post("/api/facture/create",[authJwt.verifyToken], controller.create);

  app.post("/api/facture/getByIdEcole",[authJwt.verifyToken], controller.findByIdEcole);
  app.post("/api/facture/getByIdReservation",[authJwt.verifyToken], controller.findByIdReservation);
  app.post("/api/facture/update",[authJwt.verifyToken], controller.update);
  app.delete("/api/facture/deleteAll",[authJwt.verifyToken], controller.deleteAll);
  app.delete("/api/facture/delete",[authJwt.verifyToken], controller.delete);

};
