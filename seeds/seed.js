const sequelize = require('../config/connection');
const { Manager, Client, Project } = require('../models');

const clientData = require('./clientData.json');
const managerData = require('./managerData.json');
const projectData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const managers = await Manager.bulkCreate(managerData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
    });
  }

  for (const client of clientData) {
    await Client.create({
      ...client,
    });
  }

  process.exit(0);
};

seedDatabase();
