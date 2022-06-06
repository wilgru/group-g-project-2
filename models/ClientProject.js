const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ClientProject extends Model {}

ClientProject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Client',
        key: 'id',
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Project',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ClientProject',
  },
);

module.exports = ClientProject;
