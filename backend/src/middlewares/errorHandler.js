// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  console.error('[ERROR]', err.message);
  res.status(status).json({
    success: false,
    message: err.message || 'Erreur serveur',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};
