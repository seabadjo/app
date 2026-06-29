const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Media = sequelize.define('Media', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title:    { type: DataTypes.STRING, allowNull: false },
  type:     { type: DataTypes.ENUM('photo', 'video', 'album'), allowNull: false },
  url:      { type: DataTypes.STRING, allowNull: false },
  thumbnail: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING },
  takenAt:  { type: DataTypes.DATE },
  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'media' });

module.exports = Media;
