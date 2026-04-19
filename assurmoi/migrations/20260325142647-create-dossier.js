'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('Dossier', {
                id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.INTEGER
                },
                numeroDossier: {
                  type: Sequelize.STRING,
                  allowNull: true,
                },
                sinistre_id: {
                  type: Sequelize.INTEGER,
                  allowNull: true,
                  references: { model: 'Sinistre', key: 'id' },
                },
                statut: {
                  type: Sequelize.ENUM(
                    'INITIALISE',
                    'EN_ATTENTE_EXPERTISE',
                    'EXPERTISE_PLANIFIEE',
                    'EXPERTISE_REALISEE',
                    'REPARATION',
                    'INDEMNISATION',
                    'CLOTURE'),
                  allowNull: false
                },
                estReparable: {
                  type: Sequelize.BOOLEAN,
                  allowNull: true,
                  defaultValue: null
                },
                montantIndemnisation: {
                  type: Sequelize.INTEGER,
                  allowNull: true
                },
                dateIndemnisation: {
                  type: Sequelize.DATE,
                  allowNull: true
                },
                contexte: {
                  type: Sequelize.STRING,
                  allowNull: true,
                },
                estApprouveClient: {
                  type: Sequelize.BOOLEAN,
                  allowNull: true,
                  defaultValue: null
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
        await queryInterface.removeColumn('Expertise', 'dossier_id', { transaction })
        await queryInterface.removeColumn('Intervention', 'dossier_id', { transaction })
        await queryInterface.removeColumn('Facture', 'dossier_id', { transaction })
        await queryInterface.removeColumn('Historique', 'dossier_id', { transaction })
        await queryInterface.dropTable('Dossier', { transaction })
        transaction.commit()
      } catch(err) {
          transaction.rollback()
      }
  }
};