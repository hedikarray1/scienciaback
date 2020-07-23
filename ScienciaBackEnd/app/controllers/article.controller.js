const db = require("../models");
const Article = db.article;
const Op = db.Sequelize.Op;
const fs = require("fs");


// Create and Save a new Article
exports.create = (req, res) => {
    // Create a Article
    const art = {
      titre: req.body.titre ,
     description:  req.body.description,
     photo: req.body.photo
    };
    // Save Article in the database
    Article.create(art)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Article."
            });
        });
};


exports.uploadImage = (req, res) => {
  
    console.log(req.file);
    
   console.log("upload image service start");
    if (req.file == undefined) {
      return res.send({ message: `You must select a file.`});
    }
  
  
    const data= fs.readFileSync(
      __basedir + "/app/public/tmp/image_article/" + req.file.filename
    )
    Article.findOne({
      where: {
        id: req.body.id
      }
    })
      .then(art => {
        if (!art) {
          return res.status(404).send({ message: "Article Not found." });
        } 
        Article.update({
          photo: req.body.photo                                                                                                                                                     
        }, {
          where: {
            id: req.body.id
          }
        })
          .then(() => {
            fs.writeFileSync(
              __basedir + "/app/public/image_article/" + req.body.photo ,
              data
            );
            try {
                fs.unlinkSync(
                    __basedir + "/app/public/tmp/image_article/" + req.file.filename
                )
                //file removed
              } catch(err) {
                console.error(err)
              }
            res.status(200).send({ message: "Article was updated successfully! and File has been uploaded" });
           
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
  
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  } ;
  



// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
    Article.findAll().then(Articles => {
        res.status(200).send(Articles)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

// Find a single Article with an id
exports.findOneById = (req, res) => {
    const id = req.body.id;
    Article.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Article Not found."
                });
            }

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Article with id=" + id
            });
        });
};


// Update a Article by the id in the request
exports.update = (req, res) => {

    Article.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(article => {
            if (!article) {
                return res.status(404).send({
                    message: "Article Not found."
                });
            }

            const art = {
               titre: req.body.titre ,
              description:  req.body.description,
              photo: req.body.photo
             };

            Article.update(art, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(() => {
                    res.send({
                        message: "Article was Updated successfully!"
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

// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
    Article.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(article => {
            if (!article) {
                return res.status(404).send({
                    message: "Article Not found."
                });
            }

            Article.destroy({
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.status(200).send({
                    message: "Article was deleted successfully!."
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

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
    Article.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(200).send({
            message: nums+ " Articles was deleted successfully!."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
