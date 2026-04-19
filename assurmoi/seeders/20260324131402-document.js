'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Document', [
      {
        titre: 'Attestation Assurance',
        type: "Attestation d'assurance",
        chemin: '/documents/attestation_001.pdf',
      },
      {
        titre: 'Carte Grise Vehicule',
        type: 'Carte grise',
        chemin: '/documents/carte_grise_001.pdf',
      },
      {
        titre: 'CIN Client',
        type: 'Pièce d\'identité',
        chemin: '/documents/cin_001.pdf',
      },
      {
        titre: 'RIB Client',
        type: 'Rib',
        chemin: '/documents/rib_001.pdf',
      },
      {
        titre: 'Facture',
        type: 'Facture',
        chemin: '/documents/rapport_expertise_001.pdf',
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Document', null, {})
  }
};