const db = require("../models");
const Formation = db.formation;
const Op = db.Sequelize.Op;

const fs = require("fs");
// Create and Save a new 


exports.uploadPdf = (req, res) => {
    // Update User to Database*
    console.log(req.file);
    
   console.log("upload Pdf service start");
    if (req.file == undefined) {
      return res.send({ message: `You must select a file.`});
    }
  
    
  
    const data= fs.readFileSync(
      __basedir + "/app/public/tmp/Pdf/" + req.file.filename
    )
    Formation.findOne({
      where: {
        id: req.body.id
      }
    })
      .then(formation => {
        if (!formation) {
          return res.status(404).send({ message: "formation Not found." });
        } 
        Formation.update({
            detail_pdf: req.body.detail_pdf                                                                                                                                                     
        }, {
          where: {
            id: req.body.id
          }
        })
          .then(() => {
            fs.writeFileSync(
              __basedir + "/app/public/pdf_formation/" + req.body.detail_pdf ,
              data
            );
            try {
                fs.unlinkSync(
                    __basedir + "/app/public/tmp/Pdf/" + req.file.filename
                )
                //file removed
              } catch(err) {
                console.error(err)
              }
            res.status(200).send({ message: "Formation was updated successfully ! and File has been uploaded" });
           
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
  
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  } ;
  
  


exports.create = (req, res) => {
    // Create a new
    const formation = {
        nom: req.body.nom,
        description: req.body.description,
        type: req.body.type,
        prix_enfant_heure: req.body.prix_enfant_heure,
        detail_pdf: req.body.detail_pdf,
        duree: req.body.duree,
    };
    // Save  in the database
    Formation.create(formation)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Formation ."
            });
        });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
    Formation.findAll().then(formations => {
        res.status(200).send(formations)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

// Find  with an id
exports.findOneById = (req, res) => {
    const id = req.body.id;
    Formation.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Formation Not found."
                });
            }
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Formation with id=" + id
            });
        });
};

// Find  with nom
exports.findByNom = (req, res) => {
    const nom = req.body.nom;
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
  
    Formation.findAll({ where: condition })
      .then(data => {
        if (data.length == 0) { 
            return res.status(404).send({
                message: "formation  Not found."
            });
        }

        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Formation."
        });
      });
  };
// Find  with type
  exports.findByType = (req, res) => {
    Formation.findAll({ 
        where: {
        type: req.body.type
    }})
      .then(data => {
        if (data.length == 0) { 
            return res.status(404).send({
                message: "formation  Not found."
            });
        }
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Formation."
        });
      });
  };

// Update  by the id in the request
exports.update = (req, res) => {

    Formation.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(formation => {
            if (!formation) {
                return res.status(404).send({
                    message: "formation Not found."
                });
            }

            const formation1 = {
                nom: req.body.nom,
                description: req.body.description,
                type: req.body.type,
                prix_enfant_heure: req.body.prix_enfant_heure,
                detail_pdf: req.body.detail_pdf,
                duree: req.body.duree
            };

            Formation.update(formation1, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "Formation was Updated successfully!"
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                });

        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });

};

// Delete  with the specified id in the request
exports.delete = (req, res) => {
    Formation.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(formation => {
            if (!formation) {
                return res.status(404).send({
                    message: "Formation Not found."
                });
            }

            Formation.destroy({
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.status(200).send({
                    message: "Formation was deleted successfully!."
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });

        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });

};

// Delete all from the database.
exports.deleteAll = (req, res) => {
    Formation.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).send({
            message: nums+ " Formations was deleted successfully!."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};