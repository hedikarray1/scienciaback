const moment = require('moment');
moment.locale('fr');

module.exports = (sequelize, Sequelize) => {
    const DemandeKit = sequelize.define("demande_kit", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        id_formateur: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'user',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        id_employe: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'user',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        etat: {
            type: Sequelize.INTEGER
        }, 
        etat_livraison: {
            type: Sequelize.INTEGER
        }, 
        date_demande: {
            type: Sequelize.DATE,
            get: function() {
                return moment(this.getDataValue('date_demande')).tz("Africa/Tunis").fromNow();
            }
        }, 
         prix: {
            type: Sequelize.FLOAT 
        }, 
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'demande_kit'
    });

    return DemandeKit;
};