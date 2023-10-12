const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Recipe', {
    id:{
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique:true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dishSummary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
     defaultValue: true,
    },
  },
  {timestamps:false});
};
