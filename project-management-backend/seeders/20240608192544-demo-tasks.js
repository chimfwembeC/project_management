// seeders/YYYYMMDDHHMMSS-demo-tasks.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Task 1',
        description: 'Description for task 1',
        dueDate: new Date(),
        priority: 1,
        projectId: 1, // assuming this project id exists
        assignedTo: 1, // assuming this user id exists
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Task 2',
        description: 'Description for task 2',
        dueDate: new Date(),
        priority: 2,
        projectId: 2, // assuming this project id exists
        assignedTo: 2, // assuming this user id exists
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
