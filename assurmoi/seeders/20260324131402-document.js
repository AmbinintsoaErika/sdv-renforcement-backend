'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const uploadDir = '/uploads/documents';

    await queryInterface.bulkInsert('Document', [
      {
        titre: 'Attestation Assurance',
        type: "Attestation d'assurance",
        chemin: `${uploadDir}/attestation_001.pdf`,
      },
      {
        titre: 'Carte Grise Vehicule',
        type: 'Carte grise',
        chemin: `${uploadDir}/carte_grise_001.pdf`,
      },
      {
        titre: 'CIN Client',
        type: 'Pièce d\'identité',
        chemin: `${uploadDir}/cin_001.pdf`,
      },
      {
        titre: 'RIB Client',
        type: 'Rib',
        chemin: `${uploadDir}/rib_001.pdf`,
      },
      {
        titre: 'Facture',
        type: 'Facture',
        chemin: `${uploadDir}/rapport_expertise_001.pdf`,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Document', null, {});
  }
};