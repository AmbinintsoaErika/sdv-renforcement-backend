'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('Contrat', {
                id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.INTEGER
                },
                numeroContrat: {
                  type: Sequelize.STRING,
                  unique: true,
                  allowNull: true
                },
                user_id: {
                  type: Sequelize.INTEGER,
                  allowNull: true,
                  references: { model: 'User', key: 'id' },
                },
                immatriculationVehicule: {
                  type: Sequelize.STRING,
                  allowNull: false
                },
                rib: {
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
          await queryInterface.removeColumn('Sinistre', 'contrat_id', { transaction })
          await queryInterface.dropTable('Contrat', { transaction })
          transaction.commit()
      } catch(err) {
          transaction.rollback()
      }
    }
};