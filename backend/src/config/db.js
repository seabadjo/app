const { Sequelize } = require('sequelize');

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: process.env.NODE_ENV === 'production'
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
    })
  : new Sequelize(
      process.env.DB_NAME || 'aycm_db',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 5432),
        dialect: 'postgres',
        logging: false,
      }
    );

async function connectDB() {
  await sequelize.authenticate();
  console.log('[DB] PostgreSQL connecté');
  // Synchronise les modèles (créera les tables si elles n'existent pas)
  await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });
  console.log('[DB] Tables synchronisées');
}

module.exports = { sequelize, connectDB };
