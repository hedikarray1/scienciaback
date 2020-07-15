const db = require("../models");
const Facture = db.facture;
const Op = db.Sequelize.Op;

// Create and Save a new Facture
exports.create = (req, res) => {
    // Create a Facture
    const facture = {
        id_reservation: req.body.id_reservation ,
        id_ecole: req.body.id_ecole,
        prix: req.body.prix,
        date_facture:req.body.date_facture ,
        etat: req.body.etat
    };
    // Save Facture in the database
    Facture.create(facture)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Facture."
            });
        });
};

// Retrieve all Factures from the database.
exports.findAll = (req, res) => {
    Facture.findAll().then(Factures => {
        res.status(200).send(Factures)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

// Find a single Facture with an id
exports.findOneById = (req, res) => {
    const id = req.body.id;
    Facture.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Facture Not found."
                });
            }

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Facture with id=" + id
            });
        });
};

// Find  Facture with nom
exports.findByIdEcole = (req, res) => {
   
    Facture.findAll({ 
        where: {
            id_ecole: req.body.id_ecole
        }
    }).then(data => {
        if (data.length == 0) { 
            return res.status(404).send({
                message: "facture  Not found."
            });
        }
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Facture."
        });
      });
  };

  exports.findByIdReservation = (req, res) => {
   
    Facture.findOne({
        where: {
            id_reservation: req.body.id_reservation
        }
    }).then(facture => {
        if (!facture) { 
            return res.status(404).send({
                message: "facture  Not found."
            });
        }
        res.status(200).send(facture);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Facture."
        });
      });
  };

  

// Update a Facture by the id in the request
exports.update = (req, res) => {

    Facture.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(facture => {
            if (!facture) {
                return res.status(404).send({
                    message: "Facture Not found."
                });
            }

            const facture1 = {
                 prix: req.body.prix,
                date_facture:req.body.date_facture ,
                etat: req.body.etat
            };
            Facture.update(facture1, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "Facture was Updated successfully!"
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

// Delete a Facture with the specified id in the request
exports.delete = (req, res) => {
    Facture.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(Facture => {
            if (!Facture) {
                return res.status(404).send({
                    message: "Facture Not found."
                });
            }

            Facture.destroy({
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.status(200).send({
                    message: "Facture was deleted successfully!."
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

// Delete all Factures from the database.
exports.deleteAll = (req, res) => {
    Facture.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).send({
            message: nums+ " Factures was deleted successfully!."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
