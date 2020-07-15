module.exports = (sequelize, Sequelize) => {
    const Formation = sequelize.define("formation", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nom: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
        prix_enfant_heure: { type: Sequelize.FLOAT },
        detail_pdf: { type: Sequelize.STRING } ,                  
        duree: { type: Sequelize.INTEGER }                   
    },{
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,     
        
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
      
        // define the table's name
        tableName: 'formation'
      });
     
    return Formation;
  };