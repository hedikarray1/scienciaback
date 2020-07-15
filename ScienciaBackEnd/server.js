const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const multer = require('multer');
var fileExtension = require('file-extension')

global.__basedir = __dirname;

const app = express();

var corsOptions = 
{
  "origin": "*",
  "methods": "GET,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}
app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/app/public'));
//app.use(express.static(__dirname + '/app/public/pdf_formation'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to houssem application. Sciencia backend project" });
});

const db = require("./app/models");


db.sequelize.sync();



  require('./app/routes/auth.routes')(app);
  require('./app/routes/user.routes')(app);
  require('./app/routes/stock.routes')(app);
  require('./app/routes/type.routes')(app);
  require('./app/routes/demandeKit.routes')(app);
  require('./app/routes/facture.routes')(app);
  require('./app/routes/notification.routes')(app);
  require('./app/routes/feedback.routes')(app);
  require('./app/routes/rating_formateur.routes')(app);
  require('./app/routes/message.routes')(app);
  require('./app/routes/formation.routes')(app);
  require('./app/routes/reservation_formation.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});