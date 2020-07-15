const db = require("../models");
const ReservationFormation = db.reservationFormation;
const Op = db.Sequelize.Op;
const User = db.user;
const Formation = db.formation;

const moment = require('moment');
moment.locale('fr')

// Create and Save a new ReservationFormation
exports.create = (req, res) => {
    // Create a ReservationFormation
    const resFormation = {
        id_formateur:  req.body.id_formateur,
        id_ecole:  req.body.id_ecole,
        id_formation:  req.body.id_formation,
        nbr_enfants:   req.body.nbr_enfants,
        date_formation:   req.body.date_formation,
        date_reservation:  req.body.date_reservation,
        prix_totale:  req.body.prix_totale,
        status:  req.body.status ,
        status_validation : req.body.status_validation
    };
    // Save ReservationFormation in the database
    ReservationFormation.create(resFormation)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the ReservationFormation."
            });
        });
};

// Retrieve all ReservationFormations from the database.
exports.findAll = (req, res) => {
    ReservationFormation.findAll({ 
        include: [{
            model: User,
            as : "formateur",
            attributes: {
                exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
              }
        },{
            model: User,
            as : "ecole",
            attributes: {
                exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
              }
        },{
            model: Formation,
            as : "formation"
        }
       ],
     
    }).then(ReservationFormations => {
        res.status(200).send(ReservationFormations) ;
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

// Find a single ReservationFormation with an id
exports.findOneById = (req, res) => {
    const id = req.body.id;
    ReservationFormation.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "ReservationFormation Not found."
                });
            }

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ReservationFormation with id=" + id
            });
        });
};

// Find  ReservationFormation with nom
exports.findByIdEcole = (req, res) => {
   
    ReservationFormation.findAll({ 
        where: {
            id_ecole: req.body.id_ecole
        },
        include: [{
            model: User,
            as : "formateur",
            attributes: {
                exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
              }
        },
        {
            model: Formation,
            as : "formation"
        }
       ],
        order: [
        ['date_formation', 'DESC']
    ]
    }).then(data => {
      
        res.status(200).send(setReservationDateFormat(data));
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ReservationFormation."
        });
      });
  };


  
// Find  ReservationFormation with nom
exports.findByIdEcoleAndStatus = (req, res) => {
   
    ReservationFormation.findAll({ 
        where: {
            id_ecole: req.body.id_ecole,
            status : req.body.status
        },
        include: [{
            model: User,
            as : "formateur",
            attributes: {
                exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
              }
        },
        {
            model: Formation,
            as : "formation"
        }
       ],
        order: [
        ['date_formation', 'DESC']
    ]
    }).then(data => {
      
        res.status(200).send(setReservationDateFormat(data));
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ReservationFormation."
        });
      });
  };
  
// Find  ReservationFormation with nom
exports.findActiviteFormateur = (req, res) => {
   
    ReservationFormation.findAll({ 
        where: {
            id_formateur: req.body.id_formateur,
            status : 1
        },
        include: [{
            model: User,
            as : "ecole",
            attributes: {
                exclude: ['password','username','email','dateNaissance','role','telephone','etat']
              }
        },
        {
            model: Formation,
            as : "formation"
        }
       ],
        order: [
        ['date_formation', 'DESC']
    ]
    }).then(data => {
        
        res.status(200).send(setActiviteFormateurData(data));
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ReservationFormation."
        });
      });
  };

  function setActiviteFormateurData(data){

    let dataSetting =  [];
 
        for (let af of data){
          
            let dateFin = new Date(af.date_formation) ;
            dateFin.setHours( dateFin.getHours() + af.formation.duree ) ;

            let d ={
            Id : af.id ,
            Subject :"Formation "+af.formation.type ,
            Description: "<ul><li><b>Formation :</b> "+af.formation.nom +"</li><li> <b>ecole :</b> "+af.ecole.nom +"</li><li> <b>nombre d'enfants : </b>"+af.nbr_enfants +"</li></ul>" ,
            Location: af.ecole.adresse,
            StartTime : af.date_formation,
            EndTime : dateFin
           }
          
           dataSetting.push(d); 
        }
    
      return dataSetting ;
    

  }

  
// Find  ReservationFormation with nom
exports.findDemandeActiviteFormateur = (req, res) => {
   
    ReservationFormation.findAll({ 
        where: {
            id_formateur: req.body.id_formateur,
            status : 0
        },
        include: [{
            model: User,
            as : "ecole",
            attributes: {
                exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
              }
        },
        {
            model: Formation,
            as : "formation"
        }
       ],
        order: [
        ['date_formation', 'DESC']
    ]
    }).then(data => {
        
        res.status(200).send(setReservationDateFormat(data));
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ReservationFormation."
        });
      });
  };

  
  
// Find  ReservationFormation with nom
exports.findHistoriqueDemandeFormateur = (req, res) => {
   
    ReservationFormation.findAll({ 
        where: {
            id_formateur: req.body.id_formateur,
            status : req.body.status 
        },
        include: [{
            model: User,
            as : "ecole",
            attributes: {
                exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
              }
        },
        {
            model: Formation,
            as : "formation"
        }
       ],
        order: [
        ['date_formation', 'DESC']
    ]
    }).then(data => {
        
        res.status(200).send(setReservationDateFormat(data));
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ReservationFormation."
        });
      });
  };

  
// Find  ReservationFormation with nom
exports.findFormationFormateurValider = (req, res) => {
   
    ReservationFormation.findAll({ 
        where: {
            id_formateur: req.body.id_formateur,
            status : 2
        },
        include: [{
            model: User,
            as : "ecole",
            attributes: {
                exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
              }
        },
        {
            model: Formation,
            as : "formation"
        }
       ],
        order: [
        ['date_formation', 'DESC']
    ]
    }).then(data => {
        
        res.status(200).send(setReservationDateFormat(data));
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ReservationFormation."
        });
      });
  };


  
// Find  ReservationFormation with nom
exports.findByIdFormateur = (req, res) => {
   
    ReservationFormation.findAll({ 
        where: {
            id_formateur: req.body.id_formateur
        },
        include: [{
            model: User,
            as : "ecole",
            attributes: {
                exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
              }
        },
        {
            model: Formation,
            as : "formation"
        }
       ],
        order: [
        ['date_formation', 'DESC']
    ]
    }).then(data => {
      
        res.status(200).send(setReservationDateFormat(data));
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ReservationFormation."
        });
      });
  };


// Update a ReservationFormation by the id in the request
exports.update = (req, res) => {

    ReservationFormation.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(ResFormation => {
            if (!ResFormation) {
                return res.status(404).send({
                    message: "ReservationFormation Not found."
                });
            }

            const resFormation = {
                id_formateur:  req.body.id_formateur,
                id_ecole:  req.body.id_ecole,
                id_formation:  req.body.id_formation,
                nbr_enfants:   req.body.nbr_enfants,
                date_formation:   req.body.date_formation,
                date_reservation:  req.body.date_reservation,
                prix_totale:  req.body.prix_totale,
                status:  req.body.	status,
                status_validation : req.body.status_validation
            };
            ReservationFormation.update(resFormation, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "ReservationFormation was Updated successfully!"
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


// Update a ReservationFormation by the id in the request
exports.updateStatus = (req, res) => {

    ReservationFormation.findOne({
            where: {
                id: req.body.id
            }
        })
        .then( ResFormation => {
            if (!ResFormation) {
                return res.status(404).send({
                    message: "ReservationFormation Not found."
                });
            }

            const resFormation = {
                status:  req.body.status
            };
            ReservationFormation.update(resFormation, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "ReservationFormation was Updated successfully!"
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


// Update a ReservationFormation by the id in the request
exports.updateStatusValidation = (req, res) => {

    ReservationFormation.findOne({
            where: {
                id: req.body.id
            }
        })
        .then( ResFormation => {
            if (!ResFormation) {
                return res.status(404).send({
                    message: "ReservationFormation Not found."
                });
            }

            const resFormation = {
                status_validation:  req.body.status_validation,
                status : 2 
            };
            ReservationFormation.update(resFormation, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "ReservationFormation was Updated successfully!"
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


// Update a ReservationFormation by the id in the request
exports.validerFormation = (req, res) => {

    ReservationFormation.findOne({
            where: {
                id: req.body.id
            }
        })
        .then( ResFormation => {
            if (!ResFormation) {
                return res.status(404).send({
                    message: "ReservationFormation Not found."
                });
            }

            const resFormation = {
                nbr_enfants:req.body.nbr_enfants,
                status_validation:  req.body.status_validation,
                status : 2
            };
            ReservationFormation.update(resFormation, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "ReservationFormation was Updated successfully!"
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

// Delete a ReservationFormation with the specified id in the request
exports.delete = (req, res) => {
    ReservationFormation.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(ReservationFormation => {
            if (!ReservationFormation) {
                return res.status(404).send({
                    message: "ReservationFormation Not found."
                });
            }

            ReservationFormation.destroy({
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.status(200).send({
                    message: "ReservationFormation was deleted successfully!."
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

// Delete all ReservationFormations from the database.
exports.deleteAll = (req, res) => {
    ReservationFormation.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).send({
            message: nums+ " ReservationFormations was deleted successfully!."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

function setReservationDateFormat(reservations) {
    var mm = [];
    for (let val of reservations) {
     
            let v = {
                "id": val.id,
                "id_formateur":  val.id_formateur,
                "id_ecole":  val.id_ecole,
                "id_formation":  val.id_formation,
                "nbr_enfants":   val.nbr_enfants,
                "date_formation":    moment.utc(val.date_formation).tz("Africa/Tunis").format('LLLL'),
                "date_reservation":  val.date_reservation,
                "prix_totale":  val.prix_totale,
                "status":  val.status,
                "status_validation" : val.status_validation ,
                "ecole": val.ecole,
                "formation" : val.formation,
                "formateur" : val.formateur
            }
            mm.push(v);
    }
    return mm;
}