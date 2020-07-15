const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.stock = require("../models/stock.model.js")(sequelize, Sequelize);
db.type = require("../models/type.model.js")(sequelize, Sequelize);
db.formation = require("../models/formation.model.js")(sequelize, Sequelize);
db.facture = require("../models/facture.model.js")(sequelize, Sequelize);
db.feedback = require("../models/feedback.model.js")(sequelize, Sequelize);
db.demandeKit = require("../models/demande_kit.model.js")(sequelize, Sequelize);
db.formateurDemandeKit = require("../models/formateur_demande_kit.model.js")(sequelize, Sequelize);
db.notification = require("../models/notification.model.js")(sequelize, Sequelize);
db.ratingFormateur = require("../models/rating_formateur.model.js")(sequelize, Sequelize);
db.message = require("../models/message.model.js")(sequelize, Sequelize);
db.reservationFormation = require("../models/reservation_formation.model.js")(sequelize, Sequelize);

//Association

db.reservationFormation.belongsTo(db.user, { as: "formateur",foreignKey :"id_formateur" , targetKey: 'id'});
db.reservationFormation.belongsTo(db.user, { as: "ecole" ,foreignKey :"id_ecole" , targetKey: 'id' });
db.reservationFormation.belongsTo(db.formation, { as: "formation" ,foreignKey :"id_formation" , targetKey: 'id' });
db.user.hasOne(db.reservationFormation, { foreignKey :"id_formateur" },{ 
  onDelete: 'cascade',
  hooks: true, 
});
db.user.hasOne(db.reservationFormation, { foreignKey :"id_ecole" },{ 
  onDelete: 'cascade',
  hooks: true, 
});
db.formation.hasOne(db.reservationFormation, { foreignKey :"id_formation" },{ 
  onDelete: 'cascade',
  hooks: true, 
});

db.message.belongsTo(db.user, { as: "expediteur",foreignKey :"id_expediteur" , targetKey: 'id'});
db.message.belongsTo(db.user, { as: "destinataire" ,foreignKey :"id_destinataire" , targetKey: 'id' });
db.user.hasOne(db.message, { foreignKey :"id_expediteur" },{ 
  onDelete: 'cascade',
  hooks: true, 
});
db.user.hasOne(db.message, { foreignKey :"id_destinataire" },{ 
  onDelete: 'cascade',
  hooks: true, 
});

db.notification.belongsTo(db.user, { as: "sender" ,foreignKey :"id_sender" , targetKey: 'id' });
db.user.hasOne(db.notification, { foreignKey :"id_sender" },{ 
  onDelete: 'cascade',
  hooks: true, 
});

db.demandeKit.belongsTo(db.user, { as: "formateur" ,foreignKey :"id_formateur" , targetKey: 'id' });
db.user.hasOne(db.demandeKit, { foreignKey :"id_formateur" },{ 
  onDelete: 'cascade',
  hooks: true, 
});

db.demandeKit.belongsTo(db.user, { as: "employe" ,foreignKey :"id_employe" , targetKey: 'id' });
db.user.hasOne(db.demandeKit, { as: "employe", foreignKey :"id_employe" },{ 
  onDelete: 'cascade',
  hooks: true, 
});

db.formateurDemandeKit.belongsTo(db.stock, { as: "kit" ,foreignKey :"id_kit" , targetKey: 'id' });
db.stock.hasOne(db.formateurDemandeKit, { foreignKey :"id_kit" },{ 
  onDelete: 'cascade',
  hooks: true, 
});


db.demandeKit.hasMany(db.formateurDemandeKit, { as: "kits" ,foreignKey: "id_demande" },{ 
  onDelete: 'cascade',
  hooks: true, 
});
db.formateurDemandeKit.belongsTo(db.demandeKit, {foreignKey: "id_demande",as: "demande", targetKey: 'id'});


db.feedback.belongsTo(db.user, { as: "ecole",foreignKey :"id_ecole" , targetKey: 'id'});
db.feedback.belongsTo(db.reservationFormation, { as: "reservation" ,foreignKey :"id_reservation_formation" , targetKey: 'id' });

db.user.hasOne(db.feedback, { foreignKey :"id_ecole" },{ 
  onDelete: 'cascade',
  hooks: true, 
});

db.reservationFormation.hasOne(db.feedback, { foreignKey :"id_reservation_formation" },{ 
  onDelete: 'cascade',
  hooks: true, 
});

module.exports = db;
