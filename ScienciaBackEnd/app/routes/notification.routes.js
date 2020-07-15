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

  app.get("/api/notification/getAll", controller.findAll);
  app.post("/api/notification/getById", controller.findOneById);

  app.post("/api/notification/create", controller.create);
  app.post("/api/notification/createNotifToAllEmploye", controller.createNotifToAllEmploye);


  app.post("/api/notification/getByIdRecepteur", controller.findByIdRecepteur);
  app.post("/api/notification/countNotifByIdRecepteur", controller.countNotifByIdRecepteur);


  app.post("/api/notification/updateStatus", controller.updateStatus);

  app.post("/api/notification/update", controller.update);
  app.delete("/api/notification/deleteAll", controller.deleteAll);
  app.delete("/api/notification/delete", controller.delete);

};