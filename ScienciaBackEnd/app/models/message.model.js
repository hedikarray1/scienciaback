const moment = require('moment');
moment.locale('fr')

module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        id_expediteur: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'user',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        id_destinataire: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'user',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        date: {
            type: Sequelize.DATE,
        },
        message: {
            type: Sequelize.TEXT
        },
        state: {
            type: Sequelize.INTEGER
        }, 
        id_conversation: {
            type: Sequelize.STRING
        }, 
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,
                                    
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
                                                                                                                                    
        // define the table's name
        tableName: 'message'
    });

    return Message;
};