module.exports = (sequelize, Sequelize) => {
    const FormateurDemandeKit = sequelize.define("formateur_demande_kit", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        id_demande: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'demande_kit',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        id_kit: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'stock',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        quantite: {
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
        tableName: 'formateur_demande_kit'
    });

    return FormateurDemandeKit;
};
