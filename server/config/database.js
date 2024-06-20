// server/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('educational_games', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
