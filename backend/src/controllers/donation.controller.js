const { Donation } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

// POST /api/donations
exports.create = asyncHandler(async (req, res) => {
  const { donorName, email, amount, currency, message, isAnonymous } = req.body;
  if (!amount || amount < 1) return res.status(400).json({ success: false, message: 'Montant invalide' });

  const donation = await Donation.create({
    donorName, email, amount, currency, message, isAnonymous,
    paymentStatus: 'pending',
  });
  res.status(201).json({ success: true, donation });
});

// POST /api/donations/:id/confirm
exports.confirm = asyncHandler(async (req, res) => {
  const { paymentRef, status = 'completed' } = req.body;
  const donation = await Donation.findByPk(req.params.id);
  if (!donation) return res.status(404).json({ success: false, message: 'Don introuvable' });
  await donation.update({ paymentStatus: status, paymentRef });
  res.json({ success: true, donation });
});

// GET /api/donations (admin)
exports.list = asyncHandler(async (req, res) => {
  const items = await Donation.findAll({ order: [['createdAt', 'DESC']] });
  const totalCompleted = items
    .filter((d) => d.paymentStatus === 'completed')
    .reduce((sum, d) => sum + Number(d.amount), 0);
  res.json({ success: true, totalCompleted, items });
});
