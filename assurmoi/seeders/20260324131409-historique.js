'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Historique', [
      {
        sinistre_id: 67,
        dossier_id: 225,
        detail: 'Sinistre créé et dossier initialisé',
        user_id: 1,
        dateModification: new Date('2025-03-20 10:30:00'),
      },
      {
        sinistre_id: 67,
        dossier_id: 225,
        detail: 'Expertise planifiée pour le 25/03/2025',
        user_id: 1,
        dateModification: new Date('2025-03-21 14:15:00'),
      },
      {
        sinistre_id: 67,
        dossier_id: 225,
        detail: 'Expertise réalisée - dégâts confirmés',
        user_id: 1,
        dateModification: new Date('2025-03-19 16:45:00'),
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Historique', null, {})
  }
};