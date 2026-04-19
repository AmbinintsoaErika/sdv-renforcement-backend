const { Model, DataTypes } = require('sequelize');

const Dossier = (dbInstance, DataTypes) => {
    class Dossier extends Model {
        static associate(models) {
            this.belongsTo(models.Sinistre, { foreignKey: 'sinistre_id', as: 'Sinistre' });
            this.hasOne(models.Expertise, { foreignKey: 'dossier_id', as: 'Expertise' });
            this.hasOne(models.Intervention, { foreignKey: 'dossier_id', as: 'Intervention' });
            this.hasOne(models.Facture, { foreignKey: 'dossier_id', as: 'Facture' });
            this.hasMany(models.Historique, { foreignKey: 'dossier_id', as: 'Historiques' });
        }
    }

    Dossier.init(
        {
            numeroDossier: {
                type: DataTypes.STRING,
                allowNull: true
            },
            sinistre_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'Sinistre', key: 'id' }
            },
            statut: {
                type: DataTypes.ENUM,
                values: [
                    'INITIALISE',
                    'EN_ATTENTE_EXPERTISE',
                    'EXPERTISE_PLANIFIEE',
                    'EXPERTISE_REALISEE',
                    'REPARATION',
                    'INDEMNISATION',
                    'CLOTURE'
                ],
                defaultValue: 'INITIALISE',
                allowNull: true
            },
            estReparable: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: true
            },
            montantIndemnisation: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            dateIndemnisation: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            estApprouveClient: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize: dbInstance,
            modelName: 'Dossier',
            tableName: 'Dossier',
            timestamps: false
        }
    );

    return Dossier;
};

module.exports = Dossier;