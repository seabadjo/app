// Point d'entrée centralisé pour tous les modèles Sequelize
const { sequelize } = require('../config/db');

const User = require('./User');
const News = require('./News');
const Opportunity = require('./Opportunity');
const Pillar = require('./Pillar');
const Impact = require('./Impact');
const ContactMessage = require('./ContactMessage');
const NewsletterSubscriber = require('./NewsletterSubscriber');
const Donation = require('./Donation');
const Membership = require('./Membership');
const Ambassador = require('./Ambassador');
const EthicsCode = require('./EthicsCode');
const PresidentMessage = require('./PresidentMessage');
const CohortMember = require('./CohortMember');
const Media = require('./Media');
const Publication = require('./Publication');

// Associations
News.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(News, { foreignKey: 'authorId' });

Membership.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  News,
  Opportunity,
  Pillar,
  Impact,
  ContactMessage,
  NewsletterSubscriber,
  Donation,
  Membership,
  Ambassador,
  EthicsCode,
  PresidentMessage,
  CohortMember,
  Media,
  Publication,
};
