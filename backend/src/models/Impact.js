const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Impact = sequelize.define('Impact', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  label:  { type: DataTypes.STRING, allowNull: false, unique: true },
  value:  { type: DataTypes.INTEGER, allowNull: false },
  suffix: { type: DataTypes.STRING, defaultValue: '+' },
  icon:   { type: DataTypes.STRING },
  order:  { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'impact_stats' });

module.exports = Impact;
