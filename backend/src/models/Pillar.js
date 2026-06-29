const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pillar = sequelize.define('Pillar', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name:        { type: DataTypes.STRING, allowNull: false, unique: true },
  shortName:   { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  objectives:  { type: DataTypes.JSONB, defaultValue: [] },
  icon:        { type: DataTypes.STRING },
  color:       { type: DataTypes.STRING },
  order:       { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'pillars' });

module.exports = Pillar;
