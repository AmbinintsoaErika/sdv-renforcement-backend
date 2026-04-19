'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('Sinistre', {
                id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.INTEGER
                },
                contrat_id: {
                  type: Sequelize.INTEGER,
                  allowNull: true,
                  references: { model: 'Contrat', key: 'id' },
                },
                statut: {
                  type: Sequelize.ENUM('EN_COURS', 'COMPLET', 'CLOTURE'),
                  allowNull: false
                },
                dateAppel: {
                  type: Sequelize.DATE,
                  allowNull: true
                },
                dateSinistre: {
                  type: Sequelize.DATEONLY,
                  allowNull: true
                },
                contexte: {
                  type: Sequelize.TEXT,
                  allowNull: true,
                },
                attestationAssurance: {
                  type: Sequelize.INTEGER,
                  allowNull: true,
                  references: { model: 'Document', key: 'id'},
                },
                carteGrise: {
                  type: Sequelize.INTEGER,
                  allowNull: true,
                  references: { model: 'Document', key: 'id'},
                },
                cin: {
                  type: Sequelize.INTEGER,
                  allowNull: true,
                  references: { model: 'Document', key: 'id'},
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
          await queryInterface.removeColumn('Dossier', 'sinistre_id', { transaction })
          await queryInterface.removeColumn('Historique', 'sinistre_id', { transaction })
          await queryInterface.dropTable('Sinistre', { transaction })
          transaction.commit()
      } catch(err) {
          transaction.rollback()
      }
    }
};