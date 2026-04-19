'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('Facture', {
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
                montant: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  defaultValue: 0,
                },
                dateReceptionFacture: {
                  type: Sequelize.DATE,
                  allowNull: true
                },
                dateReglementFacture: {
                  type: Sequelize.DATE,
                  allowNull: true
                },
                estRegleParTiers: {
                  type: Sequelize.BOOLEAN,
                  allowNull: false,
                  defaultValue: false
                },
                estPaye: {
                  type: Sequelize.BOOLEAN,
                  allowNull: false,
                  defaultValue: false
                },
                document: {
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
          await queryInterface.dropTable('Facture', { transaction })
          transaction.commit()
      } catch(err) {
          transaction.rollback()
      }
    }
};