const { Model, DataTypes } = require('sequelize');

const User = (dbInstance, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.hasMany(models.Contrat, { foreignKey: 'user_id', as: 'Contrats' });
            this.hasMany(models.Historique, { foreignKey: 'user_id', as: 'Historiques' });
        }

        clean() {
            const { password, token, refresh_token, ...cleandUser} = this.dataValues;
            return cleandUser
        }
    }

    User.init(
        {
            nom: {
                type: DataTypes.STRING,
                allowNull: true
            },
            prenom: {
                type: DataTypes.STRING,
                allowNull: true
            },
            role: {
                type: DataTypes.ENUM,
                values: ['SUPER_ADMIN', 'GESTIONNAIRE', 'SUIVI', 'CLIENT'],
                required: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: { isEmail: true }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            refresh_token: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            estActif: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            sequelize: dbInstance,
            modelName: 'User',
            tableName: 'User',
            timestamps: false
        }
    );

    return User;
};

module.exports = User;