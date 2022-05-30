// import models
const Manager = require('./Manager');
const Client = require('./Client');
const Project = require('./Project');
const ClientProject = require('./ClientProject');

Client.hasMany(Project, {
    foreignKey: 'clientId',
    onDelete: 'CASCADE',
});

Project.belongsTo(Client, {
    foreignKey: 'clientId',
});

Manager.hasMany(Project, {
    foreignKey: 'managerId',
    onDelete: 'CASCADE',
});

Project.belongsTo(Manager, {
    foreignKey: 'managerId',
});

module.exports = {
  Manager,
  Client,
  Project,
  ClientProject
};