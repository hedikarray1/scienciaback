const { authJwt } = require("../middleware");
const controller = require("../controllers/type.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/type/getAll", controller.findAll);

  app.post("/api/type/getById", controller.findOneById);
  app.post("/api/type/create", controller.create);
  app.post("/api/type/getByNom", controller.findByNom);


  app.post("/api/type/update", controller.update);

  app.post("/api/type/deleteAll", controller.deleteAll);

  app.post("/api/type/delete", controller.delete);

};