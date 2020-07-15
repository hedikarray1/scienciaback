const db = require("../models");
const Type = db.type;
const Op = db.Sequelize.Op;


// Create and Save a new type
exports.create = (req, res) => {
    // Create a type
    const t = {
        nom: req.body.nom     
    };
    // Save type in the database
    Type.create(t)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the type."
            });
        });
};



// Retrieve all Types from the database.
exports.findAll = (req, res) => {
    Type.findAll().then(Types => {
        res.status(200).send(Types)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

// Find a single Type with an id
exports.findOneById = (req, res) => {
    const id = req.body.id;
    Type.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Type Not found."
                });
            }

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Type with id=" + id
            });
        });
};

// Find  Type with nom
exports.findByNom = (req, res) => {
    const nom = req.body.nom;
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
  
    Type.findAll({ where: condition })
      .then(data => {
        if (data.length == 0) { 
            return res.status(404).send({
                message: "Type  Not found."
            });
        }
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Type."
        });
      });
  };


// Update a Type by the id in the request
exports.update = (req, res) => {

    Type.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(Type => {
            if (!Type) {
                return res.status(404).send({
                    message: "Type Not found."
                });
            }

            const t = {
                nom: req.body.nom
            };

            Type.update(t, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "Type was Updated successfully!"
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

// Delete a Type with the specified id in the request
exports.delete = (req, res) => {
    Type.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(Type => {
            if (!Type) {
                return res.status(404).send({
                    message: "Type Not found."
                });
            }

            Type.destroy({
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.status(200).send({
                    message: "Type was deleted successfully!."
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

// Delete all Types from the database.
exports.deleteAll = (req, res) => {
    Type.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).send({
            message: nums+ " Types was deleted successfully!."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
