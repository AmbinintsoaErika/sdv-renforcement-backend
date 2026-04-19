'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('Intervention', {
                id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.INTEGER
                },
                dossier_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: 'Dossier', key: 'id' },
                },
                dateInterventionPlanifiee: {
                  type: Sequelize.DATEONLY,
                  allowNull: true
                },
                datePECPlanifiee: {
                  type: Sequelize.DATEONLY,
                  allowNull: true
                },
                datePEC: {
                  type: Sequelize.DATEONLY,
                  allowNull: true
                },
                dateDebutTravaux: {
                  type: Sequelize.DATE,
                  allowNull: true
                },
                dateFinTravaux: {
                  type: Sequelize.DATE,
                  allowNull: true
                },
                dateRestitutionPlanifiee: {
                  type: Sequelize.DATE,
                  allowNull: true
                },
                dateRestitutionEffective: {
                  type: Sequelize.DATE,
                  allowNull: true
                },
            }, { transaction });
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async down (queryInterface, Sequelize) {
      const transaction = await queryInterface.sequelize.transaction()
      try {
          await queryInterface.dropTable('Intervention', { transaction })
          transaction.commit()
      } catch(err) {
          transaction.rollback()
      }
    }
};