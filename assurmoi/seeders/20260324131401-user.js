'use strict';
const bcrypt = require('bcrypt');
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('pwd123', parseInt(process.env.BCRYPT_SALT));
    
    await queryInterface.bulkInsert('User', [
      {
        nom: 'Admin',
        prenom: 'Test',
        role: 'SUPER_ADMIN',
        password: hashedPassword,
        email: 'admin@sdv.fr',
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('User', {email: 'admintest@supdevinci.fr'})
  }
};
