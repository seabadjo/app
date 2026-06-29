const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const EthicsCode = sequelize.define('EthicsCode', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name:        { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: false },
  principles:  { type: DataTypes.JSONB, defaultValue: [] },
  icon:        { type: DataTypes.STRING },
  order:       { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'ethics_codes' });

module.exports = EthicsCode;
