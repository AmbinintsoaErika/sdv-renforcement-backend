const { Model, DataTypes } = require('sequelize');

const Sinistre = (dbInstance, DataTypes) => {
    class Sinistre extends Model {
        static associate(models) {
            this.belongsTo(models.Contrat, { foreignKey: 'contrat_id', as: 'Contrat' });
            this.belongsTo(models.Document, { foreignKey: 'attestationAssurance', as: 'AttestationAssurance' });
            this.belongsTo(models.Document, { foreignKey: 'carteGrise', as: 'CarteGrise' });
            this.belongsTo(models.Document, { foreignKey: 'cin', as: 'CIN' });
            this.hasMany(models.Dossier, { foreignKey: 'sinistre_id', as: 'Dossiers' });
            this.hasMany(models.Historique, { foreignKey: 'sinistre_id', as: 'Historiques' });
        }
    }

    Sinistre.init(
        {
            contrat_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'Contrat', key: 'id' }
            },
            statut: {
                type: DataTypes.ENUM,
                values: ['EN_COURS', 'COMPLET', 'CLOTURE'],
                allowNull: true
            },
            dateAppel: {
                type: DataTypes.DATE,
                allowNull: true
            },
            dateSinistre: {
                type: DataTypes.DATE,
                allowNull: true
            },
            contexte: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            responsabiliteAssuree: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            pourcentageResponsabilite: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: { isIn: [[0, 50, 100]] }
            },
            attestationAssurance: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'Document', key: 'id' }
            },
            carteGrise: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'Document', key: 'id' }
            },
            cin: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'Document', key: 'id' }
            }
        },
        {
            sequelize: dbInstance,
            modelName: 'Sinistre',
            tableName: 'Sinistre',
            timestamps: false
        }
    );

    return Sinistre;
};

module.exports = Sinistre;