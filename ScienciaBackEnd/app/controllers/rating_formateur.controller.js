const db = require("../models");
const RatingFormateur = db.ratingFormateur;
const Op = db.Sequelize.Op;


// Create and Save a new RatingFormateur
exports.create = (req, res) => {
    // Create a RatingFormateur
    

        RatingFormateur.findOne({
            where: {
                id_formateur: req.body.id_formateur,
                id_ecole: req.body.id_ecole
            }
        })
        .then(data => {
            if (!data) {
                const ratingFormateur = {
                    id_formateur: req.body.id_formateur ,
                    id_ecole: req.body.id_ecole,
                    nbr_star: req.body.nbr_star,
                    date:req.body.date 
                };
                // Save RatingFormateur in the database
            
                RatingFormateur.create(ratingFormateur)
                    .then(data2 => {
                        res.status(200).send(data2);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the RatingFormateur."
                        });
                    });
            }
           else {
           
            RatingFormateur.update({
                nbr_star: req.body.nbr_star,
                date : req.body.date 
             } , {
                    where: {
                        id_formateur: req.body.id_formateur,
                        id_ecole: req.body.id_ecole
                    }
                })
                .then(() => {
                    res.send({
                        message: "RatingFormateur was Updated successfully!"
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                });
            }

        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// Retrieve all RatingFormateurs from the database.
exports.findAll = (req, res) => {
    RatingFormateur.findAll().then(RatingFormateurs => {
        res.status(200).send(RatingFormateurs)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

// Find a single RatingFormateur with an id
exports.findOneById = (req, res) => {
    const id = req.body.id;
    RatingFormateur.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "RatingFormateur Not found."
                });
            }

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving RatingFormateur with id=" + id
            });
        });
};

// Find  RatingFormateur with nom
exports.findByIdEcole = (req, res) => {
   
    RatingFormateur.findAll({ 
        where: {
            id_ecole: req.body.id_ecole
        }
    }).then(data => {
        if (data.length == 0) { 
            return res.status(404).send({
                message: "RatingFormateur  Not found."
            });
        }
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving RatingFormateur."
        });
      });
  };

  exports.findByIdFormateur = (req, res) => {
   
    RatingFormateur.findAll({
        where: {
            id_formateur: req.body.id_formateur
        }
    }).then(data => {
        if (data.length == 0) { 
            return res.status(404).send({
                message: "RatingFormateur  Not found."
            });
        }
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving RatingFormateur."
        });
      });
  };

  exports.calculRatingFormateur = (req, res) => {

    RatingFormateur.sequelize.query('SELECT id_formateur,  AVG( nbr_star ) AS rating FROM `rating_formateur` WHERE id_formateur = :id', {
            replacements: {
                id: req.body.id_formateur
            },
            type: db.sequelize.QueryTypes.SELECT
        }).then(ratResponse => {
       
        if (ratResponse[0].rating == null){
            ratResponse[0].rating = 5 ;
           }
            res.status(200).send(ratResponse[0]);
          
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Rating."
            });
        });


};

exports.calculRatingFormateurEcole = (req, res) => {

    RatingFormateur.sequelize.query('SELECT AVG( nbr_star ) AS rating FROM `rating_formateur` WHERE id_formateur = :id_formateur AND id_ecole = :id_ecole', {
            replacements: {
                id_formateur: req.body.id_formateur,
                id_ecole: req.body.id_ecole
            },
            type: db.sequelize.QueryTypes.SELECT
        }).then(ratResponse => {
       
        if (ratResponse[0].rating == null){
            ratResponse[0].rating = 5 ;
           }
            res.status(200).send(ratResponse[0]);
          
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Rating."
            });
        });


};

/*
  exports.calculRatingFormateur = (req, res) => {
   
    RatingFormateur.findAll({
        where: {
            id_formateur: req.body.id_formateur
        },
        attributes: [db.sequelize.fn('AVG', db.sequelize.col('nbr_star'))],
    }).then(data => {
        if (data.length == 0) { 
            return res.status(404).send({
                message: "RatingFormateur  Not found."
            });
        }
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving RatingFormateur."
        });
      });
  };

  */

// Update a RatingFormateur by the id in the request
exports.update = (req, res) => {

    RatingFormateur.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "RatingFormateur Not found."
                });
            }

            const ratingFormateur = {
                id_formateur: req.body.id_formateur ,
                id_ecole: req.body.id_ecole,
                nbr_star: req.body.nbr_star,
                date:req.body.date 
            };
            RatingFormateur.update(ratingFormateur, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "RatingFormateur was Updated successfully!"
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

// Delete a RatingFormateur with the specified id in the request
exports.delete = (req, res) => {
    RatingFormateur.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "RatingFormateur Not found."
                });
            }

            RatingFormateur.destroy({
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.status(200).send({
                    message: "RatingFormateur was deleted successfully!."
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

// Delete all RatingFormateurs from the database.
exports.deleteAll = (req, res) => {
    RatingFormateur.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).send({
            message: nums+ " RatingFormateurs was deleted successfully!."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};