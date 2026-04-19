'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const contrats = await queryInterface.bulkInsert('Contrat', [
      {
        id: 422,
        numeroContrat: 'CTR-2025-422',
        user_id: 1,
        immatriculationVehicule: 'AB-987-CD',
        rib: 99,
      },
      {
        id: 423,
        numeroContrat: 'CTR-2025-423',
        user_id: 2,
        immatriculationVehicule: 'AB-001-CD',
        rib: null,
      },
    ], { returning: true })

    await queryInterface.bulkInsert('Sinistre', [
      {
        contrat_id: 422,
        statut: 'EN_COURS',
        dateAppel: new Date('2025-03-20 10:30:00'),
        dateSinistre: new Date('2025-03-20'),
        contexte: 'Accident automobile sur autoroute A1',
      },
      {
        contrat_id: 423,
        statut: 'COMPLET',
        dateAppel: new Date('2025-03-15 14:45:00'),
        dateSinistre: new Date('2025-03-15'),
        contexte: 'Dégâts des eaux suite à fuite tuyauterie',
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sinistre', null, {})
  }
};