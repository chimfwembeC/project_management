// seeders/YYYYMMDDHHMMSS-demo-users.js

'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'demoUser1',
        email: 'demo1@example.com',
        role: 'user',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'demoUser2',
        email: 'demo2@example.com',
        role: 'admin',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
