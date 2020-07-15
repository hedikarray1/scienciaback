const moment = require('moment');
moment.locale('fr')

module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notification", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        id_sender: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'user',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        id_recepteur: {

            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                // This is a reference to another model
                model: 'user',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        titre: {
            type: Sequelize.STRING
        },
        redirection: {
            type: Sequelize.STRING
        },  
        date: {
            type: Sequelize.DATE,
            get: function() {
                return moment(this.getDataValue('date')).tz("Africa/Tunis").fromNow();
            }
        },
        status: {
            type: Sequelize.INTEGER
        }
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        freezeTableName: true,

        // define the table's name
        tableName: 'notification'
    });

    return Notification;
};