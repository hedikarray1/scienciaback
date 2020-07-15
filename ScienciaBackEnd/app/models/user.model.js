const moment = require('moment');
moment.locale('fr') ;

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    nom: { type: Sequelize.STRING },
    prenom: { type: Sequelize.STRING },
    adresse: { type: Sequelize.STRING },
    dateNaissance: {
       type: Sequelize.DATEONLY,
       get: function() {
        return moment(this.getDataValue('dateNaissance')).tz("Africa/Tunis").format('LL');
    }
      },
    photo: { type: Sequelize.STRING },
    role: { type: Sequelize.ENUM('admin', 'formateur', 'employe', 'ecole') },
    telephone: { type: Sequelize.STRING },
    etat: { type: Sequelize.STRING }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'user',
   /* classMethods : {
      associate : function (models) {
        User.hasMany(models.ReservationFormation);
      }
    }*/
  });

  
  
  return User;
};
