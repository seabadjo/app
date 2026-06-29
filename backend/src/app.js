const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const newsRoutes = require('./routes/news.routes');
const opportunityRoutes = require('./routes/opportunity.routes');
const pillarRoutes = require('./routes/pillar.routes');
const impactRoutes = require('./routes/impact.routes');
const contactRoutes = require('./routes/contact.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const donationRoutes = require('./routes/donation.routes');
const membershipRoutes = require('./routes/membership.routes');
const ambassadorRoutes = require('./routes/ambassador.routes');
const ethicsRoutes = require('./routes/ethics.routes');
const presidentRoutes = require('./routes/president.routes');
const cohortRoutes = require('./routes/cohort.routes');
const mediaRoutes = require('./routes/media.routes');
const publicationRoutes = require('./routes/publication.routes');

const app = express();

// Sécurité & middlewares globaux
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limit global
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Trop de requêtes, réessayez plus tard.' },
}));

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'AYCM API opérationnelle', timestamp: new Date().toISOString() });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/pillars', pillarRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/ambassadors', ambassadorRoutes);
app.use('/api/ethics', ethicsRoutes);
app.use('/api/president', presidentRoutes);
app.use('/api/cohort', cohortRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/publications', publicationRoutes);

// 404 & gestion d'erreurs
app.use(notFound);
app.use(errorHandler);

module.exports = app;
