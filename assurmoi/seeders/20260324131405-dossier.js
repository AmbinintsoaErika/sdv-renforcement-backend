'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    const sinistres = await queryInterface.bulkInsert('Sinistre', [
      {
        id: 67,
        contrat_id: 422,
        statut: 'COMPLET',
        dateAppel: new Date('2025-03-20 10:30:00'),
        dateSinistre: new Date('2025-03-20'),
        contexte: 'Petit accrochage en ville, sans blessé, avec un autre véhicule.',
      }
    ], {returning: true})

    await queryInterface.bulkInsert('Dossier', [
      {
        numeroDossier: 'DOS-2025-001',
        sinistre_id: 67,
        statut: 'EXPERTISE_PLANIFIEE',
        estReparable: true,
        montantIndemnisation: 5000,
        estApprouveClient: false,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dossier', null, {})
  }
};