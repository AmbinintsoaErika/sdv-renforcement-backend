'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const documents = await queryInterface.bulkInsert('Document', [
      {
        id: 17,
        titre: 'Facture 17',
        type: 'Facture',
        chemin: '/documents/facture-001.pdf',
      },
      {        
        id: 18,
        titre: 'Facture 18',
        type: 'Facture',
        chemin: '/documents/facture-002.pdf',
      },
    ], { returning: true })

    await queryInterface.bulkInsert('Facture', [
      {
        dossier_id: 225,
        montant: 3500,
        dateReceptionFacture: new Date('2025-03-24'),
        dateReglementFacture: null,
        estRegleParTiers: false,
        estPaye: false,
        document: 17,
      },
      {
        dossier_id: 225,
        montant: 7200,
        dateReceptionFacture: new Date('2025-03-23'),
        dateReglementFacture: new Date('2025-03-24'),
        estRegleParTiers: true,
        estPaye: true,
        document: 18,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Facture', null, {})
    await queryInterface.bulkDelete('Document', { id: [17, 18]}, {})
  }
};