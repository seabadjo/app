const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Donation = sequelize.define('Donation', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  donorName:  { type: DataTypes.STRING },
  email:      { type: DataTypes.STRING },
  amount:     { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  currency:   { type: DataTypes.STRING(3), defaultValue: 'XOF' },
  message:    { type: DataTypes.STRING(500) },
  isAnonymous: { type: DataTypes.BOOLEAN, defaultValue: false },
  paymentStatus: { type: DataTypes.ENUM('pending', 'completed', 'failed'), defaultValue: 'pending' },
  paymentProvider: { type: DataTypes.STRING, defaultValue: 'stripe' },
  paymentRef: { type: DataTypes.STRING },
}, { tableName: 'donations' });

module.exports = Donation;
