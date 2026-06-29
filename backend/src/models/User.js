const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName:  { type: DataTypes.STRING, allowNull: false },
  email:     { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password:  { type: DataTypes.STRING, allowNull: false },
  phone:     { type: DataTypes.STRING },
  country:   { type: DataTypes.STRING },
  role:      { type: DataTypes.ENUM('member', 'ambassador', 'admin'), defaultValue: 'member' },
  avatar:    { type: DataTypes.STRING },
  bio:       { type: DataTypes.TEXT },
  isActive:  { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'users',
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) user.password = await bcrypt.hash(user.password, 10);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) user.password = await bcrypt.hash(user.password, 10);
    },
  },
  defaultScope: { attributes: { exclude: ['password'] } },
  scopes: { withPassword: { attributes: { include: ['password'] } } },
});

User.prototype.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = User;
