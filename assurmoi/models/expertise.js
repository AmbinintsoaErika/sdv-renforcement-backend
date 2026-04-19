const { Model, DataTypes } = require('sequelize');

const Expertise = (dbInstance, DataTypes) => {
    class Expertise extends Model {
        static associate(models) {
            this.belongsTo(models.Dossier, { foreignKey: 'dossier_id', as: 'Dossier' });
        }
    }

    Expertise.init(
        {
            dossier_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'Dossier', key: 'id' }
            },
            datePlanifiee: {
                type: DataTypes.DATE,
                allowNull: true
            },
            dateEffective: {
                type: DataTypes.DATE,
                allowNull: true
            },
            dateRetour: {
                type: DataTypes.DATE,
                allowNull: true
            },
            rapportExpert: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'Document', key: 'id' },
                comment: 'Document rapport expert requis pour valider étape expertise réalisée'
            }
        },
        {
            sequelize: dbInstance,
            modelName: 'Expertise',
            tableName: 'Expertise',
            timestamps: false
        }
    );

    return Expertise;
};

module.exports = Expertise;