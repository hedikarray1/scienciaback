const { authJwt } = require("../middleware");
const controller = require("../controllers/notification.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/notification/getAll",[authJwt.verifyToken], controller.findAll);
  app.post("/api/notification/getById",[authJwt.verifyToken], controller.findOneById);

  app.post("/api/notification/create",[authJwt.verifyToken], controller.create);
  app.post("/api/notification/createNotifToAllEmploye",[authJwt.verifyToken], controller.createNotifToAllEmploye);


  app.post("/api/notification/getByIdRecepteur",[authJwt.verifyToken], controller.findByIdRecepteur);
  app.post("/api/notification/countNotifByIdRecepteur",[authJwt.verifyToken], controller.countNotifByIdRecepteur);


  app.post("/api/notification/updateStatus",[authJwt.verifyToken], controller.updateStatus);

  app.post("/api/notification/update",[authJwt.verifyToken], controller.update);
  app.delete("/api/notification/deleteAll",[authJwt.verifyToken], controller.deleteAll);
  app.delete("/api/notification/delete",[authJwt.verifyToken], controller.delete);

};