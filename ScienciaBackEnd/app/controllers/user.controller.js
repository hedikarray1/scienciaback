const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const fs = require("fs");


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'houssemeddine.gabsi@esprit.tn',
    pass: ''
  }
});


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

  User.findOne({
    attributes: {
      exclude: ['password']
    },
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        User.findOne({
          attributes: {
            exclude: ['password']
          },
          where: {
            email: req.body.email
          }
        })
          .then(user => {
            if (!user) {
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
                .then(() => {
                  res.status(200).send({ message: "User was created successfully!" });
                })
                .catch(err => {
                  res.status(500).send({ message: err.message });
                });
            }
            else {
              return res.status(400).send({
                message: "email existe"
              });
            }

          })
          .catch(err => {
            res.status(500).send({
              message: err.message
            });
          });
      }
      else {
        return res.status(400).send({
          message: "Username existe"
        });
      }




    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });


};

exports.sendMail = (req, res) => {
  var mailOptions = {
    from: 'houssemeddine.gabsi@esprit.tn',
    to: 'houssemeddine.gabsi@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);

      res.status(500).send({
        message: error
      });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send(
        info.response
      )
    }
  });
};


exports.getAll = (req, res) => {
  User.findAll({
    attributes: {
      exclude: ['password']
    }
  }).then(users => {
    res.status(200).send(
      users
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
      users
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
      users
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
        dateNaissance: user.dateNaissance

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
        dateNaissance: user.dateNaissance

      });

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
        dateNaissance: user.dateNaissance

      });

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
      User.update({
        username: req.body.username,
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        telephone: req.body.telephone,
        dateNaissance: req.body.dateNaissance
      }, {
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


