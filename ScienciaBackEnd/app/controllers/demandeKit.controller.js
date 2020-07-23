const db = require("../models");
const DemandeKit = db.demandeKit;
const FormateurDemandeKit = db.formateurDemandeKit;
const Stock = db.stock;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new DemandeKit
exports.create = (req, res) => {
    // Create a DemandeKit
    const demandeKit = {
        id_formateur: req.body.id_formateur,
        etat: req.body.etat,
        date_demande: req.body.date_demande,
        prix : req.body.prix,
        id_employe : req.body.id_employe,
        etat_livraison : req.body.etat_livraison
    };

    var kits = [];
    kits = req.body.kits;
    // Save DemandeKit in the database
    DemandeKit.create(demandeKit)
        .then(data => {

            var resKits = [];

            for (let kit of kits) {
                const formateurDemandeKit = {
                    id_demande: data.id,
                    id_kit: kit.id_kit,
                    quantite: kit.quantite

                }

                FormateurDemandeKit.create(formateurDemandeKit)
                    .then(data1 => {
                        //res.status(200).send(data1);
                        resKits.push(data1);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the FormateurDemandeKit."
                        });
                    });
            }

            var demande = {
                id: data.id,
                id_formateur: data.id_formateur,
                etat: data.etat,
                etat_livraison : data.etat_livraison ,
                date_demande: data.date_demande,
                kits: resKits
            }
            res.status(200).send(demande);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the DemandeKit."
            });
        });
};

// Retrieve all DemandeKits from the database.
exports.findAll = (req, res) => {
    DemandeKit.findAll({
        include: [{
                model: FormateurDemandeKit,
                as: "kits",
                include: [{
                    model: Stock,
                    as: "kit"
                }]
            },
            {
                model: User,
                as: "formateur",
            },
              {
                    model: User,
                    as: "employe",
                }

        ], 
         order: [
            ['date_demande','DESC']
        ]
    }).then(DemandeKits => {
        res.status(200).send(DemandeKits)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

// Find a single DemandeKit with an id
exports.findOneById = (req, res) => {
    const id = req.body.id;
    DemandeKit.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "DemandeKit Not found."
                });
            }

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving DemandeKit with id=" + id
            });
        });
};

// Find  DemandeKit with nom
exports.findByIdFormateur = (req, res) => {

    DemandeKit.findAll({
            where: {
                id_formateur: req.body.id_formateur
            },
            include: [{
                    model: FormateurDemandeKit,
                    as: "kits",
                    include: [{
                        model: Stock,
                        as: "kit"
                    }]
                },
                {
                    model: User,
                    as: "employe",
                }

            ], 
            order: [
               ['date_demande','DESC']
           ]
        }).then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving DemandeKit."
            });
        });
};


// Find  DemandeKit with nom
exports.findByIdFormateurByEtat = (req, res) => {

    DemandeKit.findAll({
            where: {
                id_formateur: req.body.id_formateur,
                etat : req.body.etat
            },
            include: [{
                    model: FormateurDemandeKit,
                    as: "kits",
                    include: [{
                        model: Stock,
                        as: "kit"
                    }]
                },
                {
                    model: User,
                    as: "employe",
                }

            ], 
            order: [
               ['date_demande','DESC']
           ]
        }).then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving DemandeKit."
            });
        });
};


// Find  DemandeKit with nom
exports.findByEtat = (req, res) => {

    DemandeKit.findAll({
            where: {
                etat: req.body.etat
            },
            include: [{
                    model: FormateurDemandeKit,
                    as: "kits",
                    include: [{
                        model: Stock,
                        as: "kit"
                    }]
                },
                {
                    model: User,
                    as: "formateur",
                },
                {
                    model: User,
                    as: "employe",
                }

            ], 
            order: [
               ['date_demande','DESC']
           ]
        }).then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving DemandeKit."
            });
        });
};


// Find  DemandeKit with nom
exports.findByEtatAndIdEmploye = (req, res) => {

    DemandeKit.findAll({
            where: {
                etat: req.body.etat,
                id_employe : req.body.id_employe
            },
            include: [{
                    model: FormateurDemandeKit,
                    as: "kits",
                    include: [{
                        model: Stock,
                        as: "kit"
                    }]
                },
                {
                    model: User,
                    as: "formateur",
                },
                {
                    model: User,
                    as: "employe",
                }

            ], 
            order: [
               ['date_demande','DESC']
           ]
        }).then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving DemandeKit."
            });
        });
};



// Find  DemandeKit with nom
exports.findByEtatLivraison = (req, res) => {

    DemandeKit.findAll({
            where: {
                etat_livraison: req.body.etat_livraison,
                id_employe : req.body.id_employe
            },
            include: [{
                    model: FormateurDemandeKit,
                    as: "kits",
                    include: [{
                        model: Stock,
                        as: "kit"
                    }]
                },
                {
                    model: User,
                    as: "formateur",
                },
                {
                    model: User,
                    as: "employe",
                }

            ], 
            order: [
               ['date_demande','DESC']
           ]
        }).then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving DemandeKit."
            });
        });
};


// Update a DemandeKit by the id in the request
exports.update = (req, res) => {

    DemandeKit.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "DemandeKit Not found."
                });
            }

            const demandeKit = {
                id_formateur: req.body.id_formateur,
                etat: req.body.etat,
                date_demande: req.body.date_demande,
                prix : req.body.prix,
                id_employe : req.body.id_employe,
                etat_livraison : req.body.etat_livraison
            };
            DemandeKit.update(demandeKit, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "DemandeKit was Updated successfully!"
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


// Update a DemandeKit by the id in the request
exports.updateStatus = (req, res) => {

    DemandeKit.findOne({
        where: {
            id: req.body.id
        }
    })
    .then(data => {
        if (!data) {
            return res.status(404).send({
                message: "DemandeKit Not found."
            });
        }
if (data.id_employe == 0) {


    const demandeKit = {
        etat: req.body.etat,
        id_employe : req.body.id_employe
    };
    DemandeKit.update(demandeKit, {
            where: {
                id: req.body.id
            }
        })
        .then(() => {
            res.send({
                message: "DemandeKit was Updated successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    }else {
        return res.status(404).send({
            message: "DemandeKit encour de maintenance "
        });
    }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Update a DemandeKit by the id in the request
exports.updateStatusLivraison = (req, res) => {


    const demandeKit = {
        etat_livraison: req.body.etat_livraison,
        etat : 2 ,
        id_employe : req.body.id_employe
    };
    DemandeKit.update(demandeKit, {
            where: {
                id: req.body.id
            }
        })
        .then(() => {
            res.send({
                message: "DemandeKit was Updated successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });

};


// Delete a DemandeKit with the specified id in the request
exports.delete = (req, res) => {
    DemandeKit.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "DemandeKit Not found."
                });
            }

            DemandeKit.destroy({
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.status(200).send({
                    message: "DemandeKit was deleted successfully!."
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

// Delete all DemandeKits from the database.
exports.deleteAll = (req, res) => {
    DemandeKit.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).send({
            message: nums + " DemandeKits was deleted successfully!."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};