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

  app.get("/api/feedback/getAll", controller.findAll);
  app.post("/api/feedback/getById", controller.findOneById);
  app.post("/api/feedback/create", controller.create);

  app.post("/api/feedback/getByIdEcole", controller.findByIdEcole);
  app.post("/api/feedback/getByIdFormation", controller.findByIdFormation);

  app.post("/api/feedback/update", controller.update);
  app.delete("/api/feedback/deleteAll", controller.deleteAll);
  app.delete("/api/feedback/delete", controller.delete);

};
