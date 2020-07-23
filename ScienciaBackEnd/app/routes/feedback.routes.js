const { authJwt } = require("../middleware");
const controller = require("../controllers/feedback.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/feedback/getAll",[authJwt.verifyToken], controller.findAll);
  app.post("/api/feedback/getById",[authJwt.verifyToken], controller.findOneById);
  app.post("/api/feedback/create",[authJwt.verifyToken], controller.create);

  app.post("/api/feedback/getByIdEcole",[authJwt.verifyToken], controller.findByIdEcole);

  app.post("/api/feedback/getByIdEcoleAndReservation",[authJwt.verifyToken], controller.findByIdEcoleAndReservation);

  app.post("/api/feedback/getByIdFormation",[authJwt.verifyToken], controller.findByIdFormation);

  app.post("/api/feedback/update",[authJwt.verifyToken], controller.update);
  app.delete("/api/feedback/deleteAll",[authJwt.verifyToken], controller.deleteAll);
  app.delete("/api/feedback/delete",[authJwt.verifyToken], controller.delete);

};
