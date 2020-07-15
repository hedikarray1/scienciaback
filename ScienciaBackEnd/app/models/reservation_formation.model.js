const moment = require('moment');
moment.locale('fr')


module.exports = (sequelize, Sequelize) => {
    const ReservationFormation = sequelize.define("reservation_formation", {
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
        id_ecole: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'user',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        id_formation: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'formation',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        nbr_enfants: {
            type: Sequelize.INTEGER
        },
        date_reservation: {
            type: Sequelize.DATE,
            get: function() {
                return moment(this.getDataValue('date_reservation')).tz("Africa/Tunis").fromNow();
            }
        },
        date_formation: {
            type: Sequelize.DATE
        },
        prix_totale: {
            type: Sequelize.FLOAT
        },
        status: {
            type: Sequelize.INTEGER
        },
        status_validation: {
            type: Sequelize.INTEGER
        },
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'reservation_formation',
     
    });

   
   
    return ReservationFormation;
};