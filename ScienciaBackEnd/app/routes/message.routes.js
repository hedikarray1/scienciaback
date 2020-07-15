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

  app.get("/api/message/getAll", controller.findAll);
  app.post("/api/message/getById", controller.findOneById);
  app.post("/api/message/create", controller.create);
  
  app.post("/api/message/updateMessagechat", controller.updateMessagechat);


  app.post("/api/message/countMsgNotRead", controller.countMsgNotRead);

  app.post("/api/message/getMessagechat", controller.findMessagechat);
  app.post("/api/message/getMessageInbox", controller.findMessageInbox);

  app.delete("/api/message/deleteAll", controller.deleteAll);
  app.post("/api/message/delete", controller.delete);

};