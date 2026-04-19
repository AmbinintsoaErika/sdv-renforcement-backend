const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = {};

const dbInstance = new Sequelize(
    `mariadb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
        dialect: 'mariadb',
        dialectOptions: {
            ssl: { require: true }
        },
        logging: process.env.NODE_ENV === 'development' ? console.log : false
    }
);

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
    .filter(file =>
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        !file.includes('.test.js')
    )
    .forEach(file => {
        const model = require(path.join(__dirname, file))(dbInstance, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = { dbInstance, ...db };