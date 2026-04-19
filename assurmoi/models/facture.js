const { Model, DataTypes } = require('sequelize');

const Facture = (dbInstance, DataTypes) => {
    class Facture extends Model {
        static associate(models) {
            this.belongsTo(models.Dossier, { foreignKey: 'dossier_id', as: 'Dossier' });
            this.belongsTo(models.Document, { foreignKey: 'document', as: 'Document' });
        }
    }

    Facture.init(
        {
            dossier_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'Dossier', key: 'id' }
            },
            montant: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            dateReceptionFacture: {
                type: DataTypes.DATE,
                allowNull: true
            },
            dateReglementFacture: {
                type: DataTypes.DATE,
                allowNull: true
            },
            estRegleParTiers: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            estPaye: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            document: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'Document', key: 'id' }
            }
        },
        {
            sequelize: dbInstance,
            modelName: 'Facture',
            tableName: 'Facture',
            timestamps: false
        }
    );

    return Facture;
};

module.exports = Facture;