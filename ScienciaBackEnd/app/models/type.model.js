module.exports = (sequelize, Sequelize) => {
   const Type = sequelize.define("type", {
       id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
       nom: { type: Sequelize.STRING },
   },{
       // don't add the timestamp attributes (updatedAt, createdAt)
       timestamps: false,     
       
       // disable the modification of tablenames; By default, sequelize will automatically
       // transform all passed model names (first parameter of define) into plural.
       // if you don't want that, set the following
       freezeTableName: true,
     
       // define the table's name
       tableName: 'type'
     });
    
   return Type;
 };
