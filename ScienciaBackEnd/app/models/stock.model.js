module.exports = (sequelize, Sequelize) => {
    const Stock = sequelize.define("stock", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nom: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
        photo : { type: Sequelize.STRING },
        prix: { type: Sequelize.FLOAT },
        quantite: { type: Sequelize.INTEGER }               
    },{
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,     
        
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
      
        // define the table's name
        tableName: 'stock'
      });
     
    return Stock;
  };
