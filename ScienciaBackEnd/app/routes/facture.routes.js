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

  app.get("/api/facture/getAll", controller.findAll);
  app.post("/api/facture/getById", controller.findOneById);
  app.post("/api/facture/create", controller.create);

  app.post("/api/facture/getByIdEcole", controller.findByIdEcole);
  app.post("/api/facture/getByIdReservation", controller.findByIdReservation);
  app.post("/api/facture/update", controller.update);
  app.delete("/api/facture/deleteAll", controller.deleteAll);
  app.delete("/api/facture/delete", controller.delete);

};
