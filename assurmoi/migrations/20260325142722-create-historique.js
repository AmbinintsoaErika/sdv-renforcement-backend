'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('Historique', {
                id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.INTEGER
                },
                sinistre_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  references: { model: 'Dossier', key: 'id' },
                },
                dossier_id: {
                  type: Sequelize.INTEGER,
                  allowNull: true,
                  references: { model: 'Dossier', key: 'id' },
                },
                detail: {
                  type: Sequelize.STRING,
                  allowNull: true,
                },
                dateModification: {
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
          await queryInterface.dropTable('Historique', { transaction })
          transaction.commit()
      } catch(err) {
          transaction.rollback()
      }
    }
};