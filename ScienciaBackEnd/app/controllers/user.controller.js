const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const fs = require("fs");

const moment = require('moment');
moment.locale('fr')


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
  auth: {
    user: 'scienciateam@gmail.com',
    pass: 'sciencia123456S'
  }
});

function sendEmail(user){
  var mailOptions = {
    from: 'Sciencia Team <scienciateam@gmail.com>',
    to: user.email,
    subject: 'Bienvenue à Sciencia',
    html: "<html><body> <h1>votre information </h1> <ul><li><b>Username :</b> "+user.username+
    "</li><li><b>Email :</b> "+user.email+"</li><li><b>mot de pass :</b> "
    +user.password+"</li><li><b>Nom :</b> "
    +user.nom+"</li><li><b>Prenom :</b> "
    +user.prenom+"</li><li><b>Region :</b> "+user.adresse+"</li><li><b>Adresse :</b> "+user.emplacement+"</li><li><b>Telephone :</b> "+user.telephone+"</li><li><b>Type de compte :</b> "+user.role+"</li></ul></body></html>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);

      res.status(500).send({
        message: error
      });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send({
        message:   info.response
       } )
    }
  });
};

exports.uploadImage = (req, res) => {
  // Update User to Database*
  console.log(req.file);

  console.log("upload image service start");
  if (req.file == undefined) {
    return res.send({ message: `You must select a file.` });
  }


  const data = fs.readFileSync(
    __basedir + "/app/public/tmp/image_user/" + req.file.filename
  )
  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      User.update({
        photo: req.body.photo
      }, {
        where: {
          id: req.body.id
        }
      })
        .then(() => {
          fs.writeFileSync(
            __basedir + "/app/public/image_user/" + req.body.photo,
            data
          );
          try {
            fs.unlinkSync(
              __basedir + "/app/public/tmp/image_user/" + req.file.filename
            )
            //file removed
          } catch (err) {
            console.error(err)
          }
          res.status(200).send({ message: "User was updated successfully! and File has been uploaded" });

        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};



exports.create = (req, res) => {
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
                dateNaissance: req.body.dateNaissance,
                emplacement:req.body.emplacement
              })
                .then(user  => {
                  const userSendMail ={
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    adresse: req.body.adresse,
                    photo: req.body.photo,
                    telephone: req.body.telephone,
                    role: req.body.role,
                    etat: req.body.etat,
                    dateNaissance: req.body.dateNaissance,
                    emplacement:req.body.emplacement
                  }
                  sendEmail(userSendMail) ;
                  res.status(200).send(user );
                })
                .catch(err => {
                  console.log({ message: err.message }) ;
                  res.status(500).send({ message: err.message });
                });
            

};



exports.getAll = (req, res) => {
  User.findAll({   where: {
    id: {
        [Op.not]: 0
    }

},
    attributes: {
      exclude: ['password']
    }
  }).then(users => {
    res.status(200).send(
      setListUserDate(users)
    )
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });

};

exports.getByRole = (req, res) => {
  User.findAll({
    attributes: {
      exclude: ['password']
    },
    where: {
      role: req.body.role
    }
  }).then(users => {
    res.status(200).send(
      setListUserDate(users)
    )
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });

};


exports.getByRoleAndRegion = (req, res) => {
  User.findAll({
    attributes: {
      exclude: ['password']
    },
    where: {
      role: req.body.role,
      adresse: req.body.adresse
    }
  }).then(users => {
    res.status(200).send(
      setListUserDate(users) 
    )
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });

};



exports.getById = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }


      res.status(200).send(setUserDate(user));

    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });

};

exports.getById2 = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }


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
        nom_ecole: user.nom_ecole,
        etat: user.etat,
        dateNaissance: user.dateNaissance,
        emplacement:user.emplacement
      });

    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });

};

exports.getByUsername = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }


      res.status(200).send(setUserDate(user));

    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });

};


exports.getByEmail = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }


      res.status(200).send( setUserDate(user));

    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });

};




exports.delete = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      User.destroy({
        where: {
          id: req.body.id
        }
      }).then(() => {
        res.status(200).send({ message: "User was deleted successfully!." });
      }).catch(err => {
        res.status(500).send({
          message: err.message
        });
      });

    })
    .catch( err  => {
      res.status(500).send({ message: err.message });
    });
};


exports.update = (req, res) => {
  // Update User to Database
  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      User.update(
        req.body, 
        {
        where: {
          id: req.body.id
        }
      })
        .then(() => {
          res.send({ message: "User was Updated successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });


};


exports.updatePassword = (req, res) => {
  // Update User to Database
  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      User.update({
        password: bcrypt.hashSync(req.body.password, 8)
      }, {
        where: {
          id: req.body.id
        }
      })
        .then(() => {
          res.send({ message: "Password was Updated successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });


};


exports.bloquer = (req, res) => {
  // Update User to Database
  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      User.update({
        etat: "desactive"
      }, {
        where: {
          id: req.body.id
        }
      })
        .then(() => {
          res.send({ message: "user was blocked successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.debloquer = (req, res) => {
  // Update User to Database
  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      User.update({
        etat: "active"
      }, {
        where: {
          id: req.body.id
        }
      })
        .then(() => {
          res.send({ message: "user was blocked successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};




function setListUserDate(users) {
  var mm = [];
  for (let user of users) {
   
          let v = {
              "id": user.id,
              "username": user.username,
              "email": user.email,
              "nom": user.nom,
              "prenom": user.prenom,
              "adresse": user.adresse,
              "photo": user.photo,
              "telephone": user.telephone,
              "role": user.role ,
              "etat": user.etat,
              "dateNaissance":  moment.utc(user.dateNaissance).tz("Africa/Tunis").format('LL') ,
              "emplacement": user.emplacement
      
          }
          mm.push(v);
  }
  return mm;
}



function setUserDate(user) {
 
  
   
          let v = {
              "id": user.id,
              "username": user.username,
              "email": user.email,
              "nom": user.nom,
              "prenom": user.prenom,
              "adresse": user.adresse,
              "photo": user.photo,
              "telephone": user.telephone,
              "role": user.role ,
              "etat": user.etat,
              "dateNaissance":  moment.utc(user.dateNaissance).tz("Africa/Tunis").format('LL') ,
              "emplacement" : user.emplacement
      
          };
  return v;
}