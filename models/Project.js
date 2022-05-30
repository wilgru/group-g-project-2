const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Project extends Model {}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        budget: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        managerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Project',
    }
);

module.exports = Project;