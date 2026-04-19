'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('test1234', parseInt(process.env.BCRYPT_SALT));

    const users = await queryInterface.bulkInsert('User', [
      {
        id: 1,
        lastname: 'Erika',
        firstname: 'Test',
        role: 'SUPER_ADMIN',
        password: hashedPassword,
        email: 'erika@sdv.fr',
      },
      {
        id: 2,
        lastname: 'Toto',
        firstname: 'Test',
        role: 'SUPER_ADMIN',
        password: hashedPassword,
        email: 'toto@sdv.fr',
      }
    ], { returning: true })

    const documents = await queryInterface.bulkInsert('Document', [
      {
        id: 99,
        titre: 'RIB Contrat 001',
        type: 'Rib',
        chemin: '/documents/rib_001.pdf',
      },
    ], { returning: true })
    
    await queryInterface.bulkInsert('Contrat', [
      {
        numeroContrat: 'CTR-2025-001',
        user_id: 1,
        immatriculationVehicule: 'AB-123-CD',
        rib: 99,
      },
      {
        numeroContrat: 'CTR-2025-002',
        user_id: 2,
        immatriculationVehicule: 'XY-789-EF',
        rib: null,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contrat', null, {})
    await queryInterface.bulkDelete('Document', { id: 99 }, {})
    await queryInterface.bulkDelete('User', { email: ['toto@sdv.fr', 'erika@sdv.fr'] }, {})
  }
};