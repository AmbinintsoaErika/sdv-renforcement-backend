const { Model, DataTypes } = require('sequelize');

const Document = (dbInstance, DataTypes) => {
    class Document extends Model {
        static associate(models) {
            this.hasMany(models.Sinistre, { foreignKey: 'attestationAssurance', as: 'AttestationAssurances' });
            this.hasMany(models.Sinistre, { foreignKey: 'carteGrise', as: 'CarteGrises' });
            this.hasMany(models.Sinistre, { foreignKey: 'cin', as: 'CINs' });
            this.hasMany(models.Contrat, { foreignKey: 'rib', as: 'RibDocuments' });
            this.hasMany(models.Facture, { foreignKey: 'document', as: 'Documents' });
        }
    }

    Document.init(
        {
            titre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM,
                values: [
                    "attestation d'assurance",
                    'carte grise',
                    "cin",
                    'rib',
                    'facture',
                    'rapport expertise'
                ],
                allowNull: true
            },
            chemin: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        {
            sequelize: dbInstance,
            modelName: 'Document',
            tableName: 'Document',
            timestamps: false
        }
    );

    return Document;
};

module.exports = Document;