'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('pwd123', parseInt(process.env.BCRYPT_SALT));
    
    await queryInterface.bulkInsert('User', [
      {
        lastname: 'Admin',
        firstname: 'Test',
        role: 'SUPER_ADMIN',
        password: hashedPassword,
        email: 'admin@sdv.fr',
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', {email: 'admin@sdv.fr'})
  }
};