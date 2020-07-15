const moment = require('moment');
moment.locale('fr') ;

module.exports = (sequelize, Sequelize) => {
    const RatingFormateur = sequelize.define("rating_formateur", {
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
        id_formateur : {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'user',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        date: {
            type: Sequelize.DATE ,
            get: function() {
                return moment(this.getDataValue('dateNaissance')).tz("Africa/Tunis").format('LLLL');
            }
        },
        nbr_star: {
            type: Sequelize.INTEGER
        }
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'rating_formateur'
    });

    return RatingFormateur;
};