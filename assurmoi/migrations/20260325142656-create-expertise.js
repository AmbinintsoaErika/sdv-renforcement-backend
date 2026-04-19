'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('Expertise', {
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
                datePlanifiee: {
                  type: Sequelize.DATEONLY,
                  allowNull: true
                },
                dateEffective: {
                  type: Sequelize.DATEONLY,
                  allowNull: true
                },
                dateRetour: {
                  type: Sequelize.DATE,
                  allowNull: true
                },
                rapportExpert: {
                  type: Sequelize.INTEGER,
                  allowNull: true,
                  references: { model: 'Document', key: 'id' },
                }
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
          await queryInterface.dropTable('Expertise', { transaction })
          transaction.commit()
      } catch(err) {
          transaction.rollback()
      }
    }
};