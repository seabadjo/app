const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const News = sequelize.define('News', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title:    { type: DataTypes.STRING, allowNull: false },
  slug:     { type: DataTypes.STRING, allowNull: false, unique: true },
  excerpt:  { type: DataTypes.STRING(300) },
  content:  { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.ENUM('EVENEMENT', 'PROJET', 'ANNONCE', 'ACTUALITE'), defaultValue: 'ACTUALITE' },
  coverImage: { type: DataTypes.STRING },
  authorId:   { type: DataTypes.UUID },
  publishedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
  tags:     { type: DataTypes.JSONB, defaultValue: [] },
}, { tableName: 'news' });

module.exports = News;
