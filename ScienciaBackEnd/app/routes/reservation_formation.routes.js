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

  app.get("/api/reservation_formation/getAll", controller.findAll);
  app.post("/api/reservation_formation/getById", controller.findOneById);
  app.post("/api/reservation_formation/create", controller.create);

  app.post("/api/reservation_formation/getByIdEcole", controller.findByIdEcole);
  app.post("/api/reservation_formation/getByIdEcoleAndStatus", controller.findByIdEcoleAndStatus);
  app.post("/api/reservation_formation/getByIdFormateur", controller.findByIdFormateur);
  app.post("/api/reservation_formation/getActiviteFormateur", controller.findActiviteFormateur);

  app.post("/api/reservation_formation/getDemandeActiviteFormateur", controller.findDemandeActiviteFormateur);
  app.post("/api/reservation_formation/getHistoriqueDemandeFormateur", controller.findHistoriqueDemandeFormateur);
  app.post("/api/reservation_formation/getFormationFormateurValider", controller.findFormationFormateurValider);

  
  app.post("/api/reservation_formation/validerFormationFormateur", controller.validerFormation);
  
  app.post("/api/reservation_formation/updateStatus", controller.updateStatus);
  app.post("/api/reservation_formation/updateStatusValidation", controller.updateStatusValidation);

  app.post("/api/reservation_formation/update", controller.update);
  app.delete("/api/reservation_formation/deleteAll", controller.deleteAll);
  app.delete("/api/reservation_formation/delete", controller.delete);

};