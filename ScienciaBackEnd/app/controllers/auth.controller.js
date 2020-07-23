const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;


const moment = require('moment');
moment.locale('fr')


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    photo: req.body.photo,
    telephone: req.body.telephone,
    role: req.body.role,
    etat: req.body.etat,
    dateNaissance: req.body.dateNaissance
  })
    .then( () => {   
       
        res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      [Op.or] : [
        {
          username:  req.body.username
        },
        {
          email: req.body.username
        }
      ]
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if(user.etat != 'active') {
        return res.status(401).send({
          accessToken: null,
          message: "votre compte est bloquée"
        });
      }

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 28800 // 8 hours
      });
      
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
          adresse: user.adresse,
          photo: user.photo,
          telephone: user.telephone,
          role: user.role,
          etat: user.etat,
          dateNaissance: moment.utc(user.dateNaissance).tz("Africa/Tunis").format('LL') ,
          accessToken: token
        });
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};