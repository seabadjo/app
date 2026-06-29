const { NewsletterSubscriber } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

// POST /api/newsletter/subscribe
exports.subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email requis' });

  const [sub] = await NewsletterSubscriber.findOrCreate({
    where: { email },
    defaults: { email, isSubscribed: true },
  });
  if (!sub.isSubscribed) await sub.update({ isSubscribed: true });
  res.status(201).json({ success: true, message: 'Inscription confirmée', subscriber: sub });
});

// POST /api/newsletter/unsubscribe
exports.unsubscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const sub = await NewsletterSubscriber.findOne({ where: { email } });
  if (sub) await sub.update({ isSubscribed: false });
  res.json({ success: true, message: 'Désabonné', subscriber: sub });
});

// GET /api/newsletter (admin)
exports.list = asyncHandler(async (req, res) => {
  const items = await NewsletterSubscriber.findAll({
    where: { isSubscribed: true },
    order: [['createdAt', 'DESC']],
  });
  res.json({ success: true, total: items.length, items });
});
