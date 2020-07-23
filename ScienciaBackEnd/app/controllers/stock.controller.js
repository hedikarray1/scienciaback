const db = require("../models");
const Stock = db.stock;
const Op = db.Sequelize.Op;

const fs = require("fs");

// Create and Save a new Stock
exports.create = (req, res) => {
    // Create a Stock
    const stk = {
        nom: req.body.nom,
        description: req.body.description,
        type: req.body.type,
        prix: req.body.prix,
        quantite: req.body.quantite
     
    };
    // Save Stock in the database
    Stock.create(stk)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Stock."
            });
        });
};



exports.uploadImage = (req, res) => {
    // Update User to Database*
    console.log(req.file);
    
   console.log("upload image service start");
    if (req.file == undefined) {
      return res.send({ message: `You must select a file.`});
    }
  
  
    const data= fs.readFileSync(
      __basedir + "/app/public/tmp/image_stock/" + req.file.filename
    )
    Stock.findOne({
      where: {
        id: req.body.id
      }
    })
      .then(stk => {
        if (!stk) {
          return res.status(404).send({ message: "Stock Not found." });
        } 
        Stock.update({
          photo: req.body.photo                                                                                                                                                     
        }, {
          where: {
            id: req.body.id
          }
        })
          .then(() => {
            fs.writeFileSync(
              __basedir + "/app/public/image_stock/" + req.body.photo ,
              data
            );
            try {
                fs.unlinkSync(
                    __basedir + "/app/public/tmp/image_stock/" + req.file.filename
                )
                //file removed
              } catch(err) {
                console.error(err)
              }
            res.status(200).send({ message: "stock was updated successfully! and File has been uploaded" });
           
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
  
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  } ;
  

// Retrieve all Stocks from the database.
exports.findAll = (req, res) => {
    Stock.findAll().then(stocks => {
        res.status(200).send(stocks)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

// Find a single Stock with an id
exports.findOneById = (req, res) => {
    const id = req.body.id;
    Stock.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Stock Not found."
                });
            }

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Stock with id=" + id
            });
        });
};

// Find  Stock with nom
exports.findByNom = (req, res) => {
    const nom = req.body.nom;
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
  
    Stock.findAll({ where: condition })
      .then(data => {
        if (data.length == 0) { 
            return res.status(404).send({
                message: "Stock  Not found."
            });
        }
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Stock."
        });
      });
  };

  exports.findByType = (req, res) => {
    Stock.findAll({ 
        where: {
        type: req.body.type
    }})
      .then(data => {
        if (data.length == 0) { 
            return res.status(404).send({
                message: "stock  Not found."
            });
        }
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Stock."
        });
      });
  };

// Update a Stock by the id in the request
exports.update = (req, res) => {

    Stock.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(stock => {
            if (!stock) {
                return res.status(404).send({
                    message: "Stock Not found."
                });
            }

            const stk = {
                nom: req.body.nom,
                description: req.body.description,
                type: req.body.type,
                prix: req.body.prix,
                quantite: req.body.quantite
            };

            Stock.update(stk, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "Stock was Updated successfully!"
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


// Update a Stock by the id in the request
exports.updateQuantite = (req, res) => {

    Stock.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(stock => {
            if (!stock) {
                return res.status(404).send({
                    message: "Stock Not found."
                });
            }
           
            const stk = {
                quantite: req.body.quantite
            };

            Stock.update(stk, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "Stock was Updated successfully!"
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


// Delete a Stock with the specified id in the request
exports.delete = (req, res) => {
    Stock.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(stock => {
            if (!stock) {
                return res.status(404).send({
                    message: "Stock Not found."
                });
            }

            Stock.destroy({
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.status(200).send({
                    message: "Stock was deleted successfully!."
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

// Delete all Stocks from the database.
exports.deleteAll = (req, res) => {
    Stock.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).send({
            message: nums+ " Stocks was deleted successfully!."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
