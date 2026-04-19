'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dossiers = await queryInterface.bulkInsert('Dossier', [
      {
        id: 225,
        numeroDossier: 'DOS-2025-001',
        sinistre_id: 67,
        statut: 'EXPERTISE_REALISEE',
        estReparable: false,
        montantIndemnisation: 100,
        estApprouveClient: true,
      }
    ], {returning: true})

    const documents = await queryInterface.bulkInsert('Document', [
      {
        id: 446,
        titre: 'Rapport Expertise',
        type: 'Rapport d\'expertise',
        chemin: '/documents/rapport-expertise-2.pdf',
      },
    ], { returning: true })

    await queryInterface.bulkInsert('Expertise', [
      {
        dossier_id: 225,
        datePlanifiee: new Date('2025-03-25'),
        dateEffective: null,
        dateRetour: null,
        rapportExpert: null,
      },
      {
        dossier_id: 225,
        datePlanifiee: new Date('2025-03-18'),
        dateEffective: new Date('2025-03-19'),
        dateRetour: new Date('2025-03-22'),
        rapportExpert: 99,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Document', { id: 446 }, {})
    await queryInterface.bulkDelete('Expertise', null, {})
  }
};