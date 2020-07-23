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

  app.get("/api/type/getAll", [authJwt.verifyToken], controller.findAll);

  app.post("/api/type/getById", [authJwt.verifyToken], controller.findOneById);
  app.post("/api/type/create", [authJwt.verifyToken], controller.create);
  app.post("/api/type/getByNom", [authJwt.verifyToken], controller.findByNom);


  app.post("/api/type/update", [authJwt.verifyToken], controller.update);

  app.post("/api/type/deleteAll", [authJwt.verifyToken], controller.deleteAll);

  app.post("/api/type/delete", [authJwt.verifyToken], controller.delete);

};