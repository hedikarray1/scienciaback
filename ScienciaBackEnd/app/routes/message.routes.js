const { authJwt } = require("../middleware");
const controller = require("../controllers/message.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/message/getAll",[authJwt.verifyToken], controller.findAll);
  app.post("/api/message/getById",[authJwt.verifyToken], controller.findOneById);
  app.post("/api/message/create",[authJwt.verifyToken], controller.create);
  
  app.post("/api/message/updateMessagechat",[authJwt.verifyToken], controller.updateMessagechat);


  app.post("/api/message/countMsgNotRead",[authJwt.verifyToken], controller.countMsgNotRead);

  app.post("/api/message/getMessagechat",[authJwt.verifyToken], controller.findMessagechat);
  app.post("/api/message/getMessageInbox",[authJwt.verifyToken], controller.findMessageInbox);

  app.delete("/api/message/deleteAll",[authJwt.verifyToken], controller.deleteAll);
  app.post("/api/message/delete",[authJwt.verifyToken], controller.delete);

};