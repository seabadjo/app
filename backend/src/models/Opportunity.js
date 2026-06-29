const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Opportunity = sequelize.define('Opportunity', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title:       { type: DataTypes.STRING, allowNull: false },
  slug:        { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: false },
  type:        { type: DataTypes.ENUM('Bourse', 'Programme', 'Fellowship', 'Stage', 'Emploi', 'Autre'), defaultValue: 'Autre' },
  country:     { type: DataTypes.STRING },
  deadline:    { type: DataTypes.DATE, allowNull: false },
  applyUrl:    { type: DataTypes.STRING },
  coverImage:  { type: DataTypes.STRING },
  isActive:    { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'opportunities' });

module.exports = Opportunity;
