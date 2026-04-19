'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('Document', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                titre: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                type: {
                    type: Sequelize.STRING,
                    enum: [
                        "Attestation d'assurance",
                        'Carte grise',
                        "Pièce d'identité",
                        'Rib',
                        'Facture',
                        'Autre'
                    ],
                    allowNull: true
                },
                chemin: {
                    type: Sequelize.STRING,
                    allowNull: false
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
          await queryInterface.removeColumn('User', 'attestationAssurance', { transaction })
          await queryInterface.removeColumn('User', 'carteGrise', { transaction })
          await queryInterface.removeColumn('User', 'cin', { transaction })
          await queryInterface.removeColumn('Contrat', 'rib', { transaction })
          await queryInterface.removeColumn('Expertise', 'rapportExpert', { transaction })
          await queryInterface.removeColumn('Facture', 'document', { transaction })
          await queryInterface.dropTable('Document', { transaction })
          transaction.commit()
        } catch(err) {
          transaction.rollback()
        }
    }
};