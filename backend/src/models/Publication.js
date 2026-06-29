const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Publication = sequelize.define('Publication', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title:    { type: DataTypes.STRING, allowNull: false },
  slug:     { type: DataTypes.STRING, allowNull: false, unique: true },
  type:     { type: DataTypes.ENUM('blog', 'rapport', 'publication', 'faq', 'document'), allowNull: false },
  description: { type: DataTypes.TEXT },
  content:  { type: DataTypes.TEXT },
  fileUrl:  { type: DataTypes.STRING },
  coverImage: { type: DataTypes.STRING },
  author:   { type: DataTypes.STRING },
  publishedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
  downloadCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  tags:     { type: DataTypes.JSONB, defaultValue: [] },
}, { tableName: 'publications' });

module.exports = Publication;
