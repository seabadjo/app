const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CohortMember = sequelize.define('CohortMember', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName:  { type: DataTypes.STRING, allowNull: false },
  role:      { type: DataTypes.STRING },
  country:   { type: DataTypes.STRING },
  photo:     { type: DataTypes.STRING },
  bio:       { type: DataTypes.TEXT },
  socialLinks: { type: DataTypes.JSONB, defaultValue: {} },
  cohortYear: { type: DataTypes.INTEGER },
  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
  order:      { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'cohort_members' });

module.exports = CohortMember;
