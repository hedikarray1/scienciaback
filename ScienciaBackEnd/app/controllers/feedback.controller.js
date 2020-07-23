const db = require("../models");
const Feedback = db.feedback;
const User = db.user;
const Reservation = db.reservationFormation;
const Formation = db.formation;
const Op = db.Sequelize.Op;

// Create and Save a new Feedback
exports.create = (req, res) => {
    // Create a Feedback
    const feedback = {
        id_reservation_formation: req.body.id_reservation_formation ,
        id_ecole: req.body.id_ecole,
        message: req.body.message,
        date:req.body.date 
    };
    // Save Feedback in the database
    Feedback.findOne({
        where: {
            id_reservation_formation: req.body.id_reservation_formation ,
            id_ecole: req.body.id_ecole
        }
    })
    .then(fb => {
        if (!fb) {
          
            Feedback.create(feedback)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Feedback."
                });
            });
        }else{
            fb.date = req.body.date ;
            fb.message = req.body.message ;

            Feedback.update(feedback, {
                where: {
                    id: fb.id
                }
            })
            .then(() => {
                res.send({
                    message: "Feedback was Updated successfully!"
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        }
      
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

  
};

// Retrieve all Feedbacks from the database.
exports.findAll = (req, res) => {
    Feedback.findAll({
        include: [{
            model: Reservation,
            as: "reservation",
            include: [{
                model: User,
                as : "formateur",
                attributes: {
                    exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
                  }
            },
            {
                model: Formation,
                as : "formation",
            }
           ]
        },
        {
            model: User,
            as: "ecole",
            attributes: {
                exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
              }
        }

    ], 
     order: [
        ['date','DESC']
    ]
    }).then(Feedbacks => {
        res.status(200).send(Feedbacks)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

// Find a single Feedback with an id
exports.findOneById = (req, res) => {
    const id = req.body.id;
    Feedback.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Feedback Not found."
                });
            }

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Feedback with id=" + id
            });
        });
};

// Find  Feedback with nom
exports.findByIdEcole = (req, res) => {
   
    Feedback.findAll({ 
        where: {
            id_ecole: req.body.id_ecole
        },
        include: [{
            model: Reservation,
            as: "reservation",
            include: [{
                model: User,
                as : "formateur",
                attributes: {
                    exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
                  }
            },
            {
                model: Formation,
                as : "formation",
            }
           ]
        },
        {
            model: User,
            as: "ecole",
            attributes: {
                exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
              }
        }

    ], 
     order: [
        ['date','DESC']
    ]
    }).then(data => {
        
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Feedback."
        });
      });
  };

  
// Find  Feedback with nom
exports.findByIdEcoleAndReservation = (req, res) => {
   
    Feedback.findOne({ 
        where: {
            id_reservation_formation : req.body.id_reservation_formation ,
            id_ecole: req.body.id_ecole
        }
    }).then(data => {
        
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Feedback."
        });
      });
  };

  exports.findByIdFormation = (req, res) => {
   
    Feedback.findAll({
        where: {
            id_reservation_formation: req.body.id_reservation_formation
        }
    }).then(data => {
        if (data.length == 0) { 
            return res.status(404).send({
                message: "Feedback  Not found."
            });
        }
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Feedback."
        });
      });
  };

  

// Update a Feedback by the id in the request
exports.update = (req, res) => {

    Feedback.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Feedback Not found."
                });
            }

            const feedback = {
                id_reservation_formation: req.body.id_reservation_formation ,
                id_ecole: req.body.id_ecole,
                message: req.body.message,
                date:req.body.date 
            };
            Feedback.update(feedback, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "Feedback was Updated successfully!"
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

// Delete a Feedback with the specified id in the request
exports.delete = (req, res) => {
    Feedback.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Feedback Not found."
                });
            }

            Feedback.destroy({
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.status(200).send({
                    message: "Feedback was deleted successfully!."
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

// Delete all Feedbacks from the database.
exports.deleteAll = (req, res) => {
    Feedback.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).send({
            message: nums+ " Feedbacks was deleted successfully!."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};