// import models
const Manager = require('./Manager');
const Client = require('./Client');
const Project = require('./Project');
const ClientProject = require('./ClientProject');

Client.hasMany(Project, {
    foreignKey: 'clientId'
})

Project.belongsTo(Client, {
    foreignKey: 'clientId'
});

Project.belongsTo(Manager, {
    foreignKey: 'managerId'
});

module.exports = {
  Manager,
  Client,
  Project,
  ClientProject
};