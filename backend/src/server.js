require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');
require('./models'); // charge tous les modèles et associations

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[AYCM API] Serveur démarré sur le port ${PORT} (${process.env.NODE_ENV})`);
    });
  } catch (err) {
    console.error('[AYCM API] Erreur au démarrage :', err.message);
    process.exit(1);
  }
})();
