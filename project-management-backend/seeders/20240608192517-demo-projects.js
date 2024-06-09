// seeders/YYYYMMDDHHMMSS-demo-projects.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Projects', [
      {
        title: 'Project 1',
        description: 'Description for project 1',
        createdBy: 1, // assuming this user id exists
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Project 2',
        description: 'Description for project 2',
        createdBy: 2, // assuming this user id exists
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Projects', null, {});
  }
};
