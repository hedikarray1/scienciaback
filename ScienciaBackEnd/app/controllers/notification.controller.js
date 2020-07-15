const db = require("../models");
const Notification = db.notification;
const Op = db.Sequelize.Op;
const User = db.user;

// Create and Save a new Notification
exports.create = (req, res) => {
    // Create a Notification
    const notification = {
        id_sender: req.body.id_sender,
        id_recepteur: req.body.id_recepteur,
        titre: req.body.titre,
        redirection: req.body.redirection,
        date: req.body.date,
        status: req.body.status,

    };
    // Save Notification in the database
    Notification.create(notification)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Notification."
            });
        });
};

// Create and Save a new Notification
exports.createNotifToAllEmploye = (req, res) => {
    // Create a Notification

    User.findAll({
        attributes: {
            exclude: ['password']
        },
        where: {
            role: 'Employé'

        }
    }).then(users => {
        let resData = [];
        for (let val of users) {
            if (val.id != 0) {
                const notification = {
                    id_sender: req.body.id_sender,
                    id_recepteur: val.id,
                    titre: req.body.titre,
                    redirection: req.body.redirection,
                    date: req.body.date,
                    status: req.body.status,

                };
                // Save Notification in the database
                Notification.create(notification)
                    .then(data => {
                        resData.push(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Notification."
                        });
                    });
            }
        }
        res.status(200).send(resData);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });


};

// Retrieve all Notifications from the database.
exports.findAll = (req, res) => {
    Notification.findAll().then(Notifications => {
        res.status(200).send(Notifications)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

// Find a single Notification with an id
exports.findOneById = (req, res) => {
    const id = req.body.id;
    Notification.findByPk(id)
        .then(data => {

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Notification with id=" + id
            });
        });
};


// Find  Notification with nom
exports.countNotifByIdRecepteur = (req, res) => {

    console.log("body", req.body);

    Notification.sequelize.query('SELECT COUNT(*) as nbr FROM `notification` WHERE id_recepteur  = :id AND status = 0  ', {
            replacements: {
                id: req.body.id_recepteur
            },
            type: db.sequelize.QueryTypes.SELECT
        }).then(data => {
        if (data[0].nbr > 99 ){
            data[0].nbr= "+99" ;
        }
            res.status(200).send(data[0]);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Notification."
            });
        });
};




// Find  Notification with nom
exports.findByIdRecepteur = (req, res) => {

    Notification.findAll({
            where: {
                id_recepteur: req.body.id_recepteur
            },
            include: [{
                model: User,
                as: "sender",
                attributes: {
                    exclude: ['password', 'username', 'email', 'adresse', 'dateNaissance', 'role', 'telephone', 'etat']
                }
            }],
            order: [
                ['date', 'DESC']
            ]
        }).then(data => {

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Notification."
            });
        });
};




// Update a Notification by the id in the request
exports.update = (req, res) => {

    Notification.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Notification Not found."
                });
            }

            const notification = {
                id_sender: req.body.id_sender,
                id_recepteur: req.body.id_recepteur,
                titre: req.body.titre,
                redirection: req.body.redirection,
                date: req.body.date,
                status: req.body.status,

            };
            Notification.update(notification, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "Notification was Updated successfully!"
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


// Update a Notification by the id in the request
exports.updateStatus = (req, res) => {

    console.log("body", req.body);
    const notification = {
        status: req.body.status
    };
    Notification.update(notification, {
            where: {
                id: req.body.id
            }
        })
        .then(() => {
            res.send({
                message: "Notification was Updated successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });



};

// Delete a Notification with the specified id in the request
exports.delete = (req, res) => {
    Notification.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Notification Not found."
                });
            }

            Notification.destroy({
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.status(200).send({
                    message: "Notification was deleted successfully!."
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

// Delete all Notifications from the database.
exports.deleteAll = (req, res) => {
    Notification.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).send({
            message: nums + " Notifications was deleted successfully!."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};