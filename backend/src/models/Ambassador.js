const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Ambassador = sequelize.define('Ambassador', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName:  { type: DataTypes.STRING, allowNull: false },
  email:     { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
  phone:     { type: DataTypes.STRING },
  country:   { type: DataTypes.STRING, allowNull: false },
  city:      { type: DataTypes.STRING },
  reason:    { type: DataTypes.TEXT, allowNull: false },
  socialLinks: { type: DataTypes.JSONB, defaultValue: {} },
  status:    { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
}, { tableName: 'ambassadors' });

module.exports = Ambassador;
