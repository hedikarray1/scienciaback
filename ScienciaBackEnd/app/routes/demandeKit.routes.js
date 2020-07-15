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

  app.get("/api/demandeKit/getAll", controller.findAll);
  app.post("/api/demandeKit/getById", controller.findOneById);
  app.post("/api/demandeKit/create", controller.create);

  app.post("/api/demandeKit/getByIdFormateur", controller.findByIdFormateur);
  app.post("/api/demandeKit/getByIdFormateurByEtat", controller.findByIdFormateurByEtat);
  
  app.post("/api/demandeKit/getByEtat", controller.findByEtat);
  app.post("/api/demandeKit/getByEtatAndIdEmploye", controller.findByEtatAndIdEmploye);

  app.post("/api/demandeKit/getDemandeValideByIdEmploye", controller.findByEtatLivraison);


  app.post("/api/demandeKit/updateStatus", controller.updateStatus);
  app.post("/api/demandeKit/updateStatusLivraison", controller.updateStatusLivraison);

  app.post("/api/demandeKit/update", controller.update);
  app.post("/api/demandeKit/deleteAll", controller.deleteAll);
  app.post("/api/demandeKit/delete", controller.delete);

};