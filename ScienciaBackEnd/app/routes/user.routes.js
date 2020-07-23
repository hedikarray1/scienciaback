const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
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

  app.get("/api/user/getAll", [authJwt.verifyToken], controller.getAll);

 // app.get("/api/user/sendMail", controller.sendMail);

  app.post("/api/user/create",[verifySignUp.checkDuplicateUsernameOrEmail , authJwt.verifyToken], controller.create);

  app.post("/api/user/getById",[authJwt.verifyToken], controller.getById);
  app.post("/api/user/getById2",[authJwt.verifyToken], controller.getById2);
  app.post("/api/user/getByUsername",[authJwt.verifyToken], controller.getByUsername);
  app.post("/api/user/getByEmail",[authJwt.verifyToken], controller.getByEmail);

  app.post("/api/user/getByRoleAndRegion",[authJwt.verifyToken], controller.getByRoleAndRegion);

  app.post("/api/user/getByRole",[authJwt.verifyToken], controller.getByRole);
  

  app.post("/api/user/uploadImageUser",[authJwt.verifyToken], upload.single("file"), controller.uploadImage);


  app.post("/api/user/update",[authJwt.verifyToken], controller.update);
  app.post("/api/user/updatePassword",[authJwt.verifyToken], controller.updatePassword);

  app.post("/api/user/bloquer",[authJwt.verifyToken], controller.bloquer);
  app.post("/api/user/debloquer",[authJwt.verifyToken], controller.debloquer);

  app.post("/api/user/delete",[authJwt.verifyToken], controller.delete);

};