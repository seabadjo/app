const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PresidentMessage = sequelize.define('PresidentMessage', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  presidentName: { type: DataTypes.STRING, allowNull: false },
  title:         { type: DataTypes.STRING, defaultValue: 'Président de African Youth Change Makers (AYCM)' },
  photo:         { type: DataTypes.STRING },
  shortQuote:    { type: DataTypes.STRING },
  excerpt:       { type: DataTypes.TEXT },
  fullMessage:   { type: DataTypes.TEXT, allowNull: false },
  isActive:      { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'president_messages' });

module.exports = PresidentMessage;
