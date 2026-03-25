'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'john_doe',
        password: 'password123',
        firstname: 'John',
        lastname: 'Doe',
        email: 'test@supdevinci.fr',
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Users', {username: 'john_doe'})
  }
};
