'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('User', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                lastname: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                firstname: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                role: {
                    type: Sequelize.STRING,
                    enum: ['SUPER_ADMIN', 'GESTIONNAIRE', 'SUIVI', 'CLIENT'],
                    required: true
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                token: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                refresh_token: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                estActif: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
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
            await queryInterface.dropTable('User', { transaction })
            transaction.commit()
        } catch(err) {
            transaction.rollback()
        }
    }
};