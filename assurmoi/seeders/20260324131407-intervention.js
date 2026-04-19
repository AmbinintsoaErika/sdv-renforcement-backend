'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Intervention', [
      {
        dossier_id: 225,
        dateInterventionPlanifiee: new Date('2025-03-28'),
        datePECPlanifiee: new Date('2025-03-26'),
        dateDebutTravaux: null,
        dateFinTravaux: null,
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Intervention', null, {})
  }
};