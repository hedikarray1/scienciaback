const moment = require('moment');
moment.locale('fr')


module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define("feedback", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        id_reservation_formation : {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'reservation_formation',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        date: {
            type: Sequelize.DATE,
            get: function() {
                return moment(this.getDataValue('date')).tz("Africa/Tunis").fromNow();
            }
        },
        message: {
            type: Sequelize.STRING
        }
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'feedback'
    });

    return Feedback;
};