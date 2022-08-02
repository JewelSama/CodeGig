const { Sequelize } = require('sequelize');

module.exports  =  new Sequelize('codegig', 'Jewel Sama', 'Flabagasted', {
    host: 'localhost',
    dialect: 'postgres'
});
