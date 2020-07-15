const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

const upload = require("../middleware/upload");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/getAll", controller.getAll);

  app.get("/api/user/sendMail", controller.sendMail);

  app.post("/api/user/create", controller.create);

  app.post("/api/user/getById", controller.getById);
  app.post("/api/user/getByUsername", controller.getByUsername);
  app.post("/api/user/getByEmail", controller.getByEmail);

  app.post("/api/user/getByRoleAndRegion", controller.getByRoleAndRegion);

  app.post("/api/user/getByRole", controller.getByRole);
  

  app.post("/api/user/uploadImageUser", upload.single("file"), controller.uploadImage);


  app.post("/api/user/update", controller.update);
  app.post("/api/user/updatePassword", controller.updatePassword);

  app.post("/api/user/bloquer", controller.bloquer);
  app.post("/api/user/debloquer", controller.debloquer);

  app.post("/api/user/delete", controller.delete);
/*
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken],
    controller.adminBoard
  );*/
};