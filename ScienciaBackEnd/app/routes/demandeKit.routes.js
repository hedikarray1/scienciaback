const { authJwt } = require("../middleware");
const controller = require("../controllers/demandeKit.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/demandeKit/getAll",[authJwt.verifyToken], controller.findAll);
  app.post("/api/demandeKit/getById",[authJwt.verifyToken], controller.findOneById);
  app.post("/api/demandeKit/create",[authJwt.verifyToken], controller.create);

  app.post("/api/demandeKit/getByIdFormateur",[authJwt.verifyToken], controller.findByIdFormateur);
  app.post("/api/demandeKit/getByIdFormateurByEtat",[authJwt.verifyToken], controller.findByIdFormateurByEtat);
  
  app.post("/api/demandeKit/getByEtat",[authJwt.verifyToken], controller.findByEtat);
  app.post("/api/demandeKit/getByEtatAndIdEmploye",[authJwt.verifyToken], controller.findByEtatAndIdEmploye);

  app.post("/api/demandeKit/getDemandeValideByIdEmploye",[authJwt.verifyToken], controller.findByEtatLivraison);


  app.post("/api/demandeKit/updateStatus",[authJwt.verifyToken], controller.updateStatus);
  app.post("/api/demandeKit/updateStatusLivraison",[authJwt.verifyToken], controller.updateStatusLivraison);

  app.post("/api/demandeKit/update",[authJwt.verifyToken], controller.update);
  app.post("/api/demandeKit/deleteAll",[authJwt.verifyToken], controller.deleteAll);
  app.post("/api/demandeKit/delete",[authJwt.verifyToken], controller.delete);

};