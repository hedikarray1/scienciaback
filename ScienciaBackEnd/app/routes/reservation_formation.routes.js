const { authJwt } = require("../middleware");
const controller = require("../controllers/reservation_formation.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/reservation_formation/getAll", [authJwt.verifyToken],controller.findAll);
  app.post("/api/reservation_formation/getById",[authJwt.verifyToken], controller.findOneById);
  app.post("/api/reservation_formation/create",[authJwt.verifyToken], controller.create);

  app.post("/api/reservation_formation/getByIdEcole", [authJwt.verifyToken], controller.findByIdEcole);
  app.post("/api/reservation_formation/getByIdEcoleAndStatus", [authJwt.verifyToken], controller.findByIdEcoleAndStatus);

  app.post("/api/reservation_formation/getByIdEcoleAndValider", [authJwt.verifyToken], controller.findByIdEcoleAndValider);

  app.post("/api/reservation_formation/getByIdFormateur", [authJwt.verifyToken], controller.findByIdFormateur);
  app.post("/api/reservation_formation/getActiviteFormateur", [authJwt.verifyToken], controller.findActiviteFormateur);

  app.post("/api/reservation_formation/getDemandeActiviteFormateur", [authJwt.verifyToken], controller.findDemandeActiviteFormateur);
  app.post("/api/reservation_formation/getHistoriqueDemandeFormateur", [authJwt.verifyToken], controller.findHistoriqueDemandeFormateur);
  app.post("/api/reservation_formation/getFormationFormateurValider", [authJwt.verifyToken], controller.findFormationFormateurValider);

  
  app.post("/api/reservation_formation/validerFormationFormateur", [authJwt.verifyToken], controller.validerFormation);
  
  app.post("/api/reservation_formation/updateStatus", [authJwt.verifyToken], controller.updateStatus);
  app.post("/api/reservation_formation/updateStatusValidation", [authJwt.verifyToken], controller.updateStatusValidation);

  app.post("/api/reservation_formation/update", [authJwt.verifyToken], controller.update);
  app.delete("/api/reservation_formation/deleteAll", [authJwt.verifyToken], controller.deleteAll);
  app.delete("/api/reservation_formation/delete", [authJwt.verifyToken], controller.delete);

};