const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Membership = sequelize.define('Membership', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId:      { type: DataTypes.UUID },
  firstName:   { type: DataTypes.STRING, allowNull: false },
  lastName:    { type: DataTypes.STRING, allowNull: false },
  email:       { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
  phone:       { type: DataTypes.STRING },
  country:     { type: DataTypes.STRING, allowNull: false },
  city:        { type: DataTypes.STRING },
  birthDate:   { type: DataTypes.DATEONLY },
  profession:  { type: DataTypes.STRING },
  motivation:  { type: DataTypes.TEXT },
  status:      { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
}, { tableName: 'memberships' });

module.exports = Membership;
