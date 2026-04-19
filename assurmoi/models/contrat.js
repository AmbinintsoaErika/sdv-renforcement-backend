const { Model, DataTypes } = require('sequelize');

const Contrat = (dbInstance, DataTypes) => {
    class Contrat extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
            this.belongsTo(models.Document, { foreignKey: 'rib', as: 'RibDocument' });
            this.hasMany(models.Sinistre, { foreignKey: 'contrat_id', as: 'Sinistres' });
        }
    }

    Contrat.init(
        {
            numero_contrat: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'User', key: 'id' }
            },
            immatriculation_vehicule: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rib: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'Document', key: 'id' }
            }
        },
        {
            sequelize: dbInstance,
            modelName: 'Contrat',
            tableName: 'Contrat',
            timestamps: false
        }
    );

    return Contrat;
};

module.exports = Contrat;