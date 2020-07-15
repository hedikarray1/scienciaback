const db = require("../models");
const Message = db.message;
const Op = db.Sequelize.Op;
const User = db.user;

const moment = require('moment');
moment.locale('fr') ;

// Create and Save a new Message
exports.create = (req, res) => {
    // Create a Message
    const message = {
        id_expediteur: req.body.id_expediteur,
        id_destinataire: req.body.id_destinataire,
        date: req.body.date,
        message: req.body.message,
        state: req.body.state,
        id_conversation: req.body.id_conversation
    };
    // Save Message in the database
    Message.create(message)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Message."
            });
        });
};

exports.updateMessagechat = (req, res) => {

   

        const message = {
            state: 1,
        };
        Message.update(message, {
                where: {
                    id_conversation: req.body.id_conversation,
                    id_destinataire: req.body.id_destinataire
                }
            })
            .then(() => {
                res.send({
                    message: "Message was Updated successfully!"
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });

    

};


// Retrieve all Messages from the database.
exports.findAll = (req, res) => {
    Message.findAll().then(Messages => {
        res.status(200).send(Messages)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

// Find a single Message with an id
exports.findOneById = (req, res) => {
    const id = req.body.id;
    Message.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Message Not found."
                });
            }

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Message with id=" + id
            });
        });
};


exports.findMessagechat = (req, res) => {

    Message.findAll({
            where: {
                id_expediteur: {
                    [Op.or]: [req.body.id_expediteur, req.body.id_destinataire]
                },
                id_destinataire: {
                    [Op.or]: [req.body.id_expediteur, req.body.id_destinataire]
                },

            },
            include: [{
                model: User,
                as : "expediteur",
                attributes: {
                    exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
                  }
            },
            {
                model: User,
                as : "destinataire",
                attributes: {
                    exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
                  }
            }
           ],
            groupe : ['date'] ,
            order: [
                ['date', 'ASC']
            ]
        }).then(data => {
          
            res.status(200).send(fomatDateMsgLLLL(data));
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Message."
            });
        });
};

function fomatDateMsgFromnow(msgs) {
    var mm = [];
    for (let val of msgs) {
     
            let v = {
                "id": val.id,
                "id_expediteur": val.id_expediteur,
                "id_destinataire": val.id_destinataire,
                "date": moment.utc(val.date).tz("Africa/Tunis").fromNow(),
                "message": val.message,
                "state": val.state,
                "id_conversation": val.id_conversation,
                "expediteur" : val.expediteur ,
                "destinataire" : val.destinataire
            }

            mm.push(v);

          
        

    }
    return mm;
}

function fomatDateMsgLLLL(msgs) {
    var mm = [];
    for (let val of msgs) {
     
            let v = {
                "id": val.id,
                "id_expediteur": val.id_expediteur,
                "id_destinataire": val.id_destinataire,
                "date": moment.utc(val.date).tz("Africa/Tunis").format('LLLL'),
                "message": val.message,
                "state": val.state,
                "id_conversation": val.id_conversation,
                "expediteur" : val.expediteur ,
                "destinataire" : val.destinataire
            }

            mm.push(v);

          
        

    }
    return mm;
}
/*
exports.findMessageInbox = (req, res) => {

    Message.sequelize.query('SELECT * FROM `message` WHERE id IN (SELECT MAX(id) FROM `message` WHERE (id_expediteur = :id OR id_destinataire = :id ) GROUP BY id_conversation) ORDER BY date DESC ', {
            replacements: {
                id: req.body.id
            },
            type: db.sequelize.QueryTypes.SELECT
        }).then(msgs => {

            res.status(200).send(finduser(msgs, req.body.id));
          //  res.status(200).send(msgs);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Message."
            });
        });


};
*/
exports.findMessageInbox = (req, res) => {

    Message.sequelize.query('SELECT MAX(id) as id FROM `message` WHERE (id_expediteur = :id OR id_destinataire = :id ) GROUP BY id_conversation', {
            replacements: {
                id: req.body.id
            },
            type: db.sequelize.QueryTypes.SELECT
        }).then(msgs => {
//**************************************** */
var mm = [];
for (let val of msgs) {
mm.push(val.id);
}
Message.findAll({
    where: {
        id : {
            [Op.in]: mm
        },
    },
    include: [{
        model: User,
        as : "expediteur",
        attributes: {
            exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
          }
    },
    {
        model: User,
        as : "destinataire",
        attributes: {
            exclude: ['password','username','email','adresse','dateNaissance','role','telephone','etat']
          }
    }
   ],
    order: [
        ['date', 'DESC']
    ]
}).then(data => {
   
    res.status(200).send(fomatDateMsgFromnow(data));
})
.catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving Message."
    });
});
//******************************************************** */
         //  res.status(200).send(mm);
          //  res.status(200).send(msgs);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Message."
            });
        });


};


exports.countMsgNotRead = (req, res) => {

    Message.sequelize.query('SELECT COUNT(*) as nbr FROM `message` WHERE  id_destinataire = :id AND state = 0 ', {
            replacements: {
                id: req.body.id
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
                message: err.message || "Some error occurred while retrieving Message."
            });
        });


};

// Delete a Message with the specified id in the request
exports.delete = (req, res) => {
    Message.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(Message => {
            if (!Message) {
                return res.status(404).send({
                    message: "Message Not found."
                });
            }

            Message.destroy({
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.status(200).send({
                    message: "Message was deleted successfully!."
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

// Delete all Messages from the database.
exports.deleteAll = (req, res) => {
    Message.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).send({
            message: nums + " Messages was deleted successfully!."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};