const { Model, DataTypes } = require('sequelize');

const Historique = (dbInstance, DataTypes) => {
    class Historique extends Model {
        static associate(models) {
            this.belongsTo(models.Sinistre, { foreignKey: 'sinistre_id', as: 'Sinistre' });
            this.belongsTo(models.Dossier, { foreignKey: 'dossier_id', as: 'Dossier' });
            this.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
        }
    }

    Historique.init(
        {
            sinistre_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'Sinistre', key: 'id' }
            },
            dossier_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'Dossier', key: 'id' }
            },
            details: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'User', key: 'id' }
            },
            dateModification: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW
            }
        },
        {
            sequelize: dbInstance,
            modelName: 'Historique',
            tableName: 'Historique',
            timestamps: false
        }
    );

    return Historique;
};

module.exports = Historique;