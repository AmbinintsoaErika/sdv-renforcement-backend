const { Model, DataTypes } = require('sequelize');

const Intervention = (dbInstance, DataTypes) => {
    class Intervention extends Model {
        static associate(models) {
            this.belongsTo(models.Dossier, { foreignKey: 'dossier_id', as: 'Dossier' });
        }
    }

    Intervention.init(
        {
            dossier_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'Dossier', key: 'id' }
            },
            dateInterventionPlanifiee: {
                type: DataTypes.DATE,
                allowNull: true
            },
            datePECPlanifiee: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            datePEC: {
                type: DataTypes.DATE,
                allowNull: true
            },
            dateDebutTravaux: {
                type: DataTypes.DATE,
                allowNull: true
            },
            dateFinTravaux: {
                type: DataTypes.DATE,
                allowNull: true
            },
            dateRestitutionPlanifiee: {
                type: DataTypes.DATE,
                allowNull: true
            },
            dateRestitutionEffective: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            sequelize: dbInstance,
            modelName: 'Intervention',
            tableName: 'Intervention',
            timestamps: false
        }
    );

    return Intervention;
};

module.exports = Intervention;