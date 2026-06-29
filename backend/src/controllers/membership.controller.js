const { Membership } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const { sendMail } = require('../utils/mailer');

// POST /api/memberships
exports.apply = asyncHandler(async (req, res) => {
  const m = await Membership.create(req.body);

  await sendMail({
    to: m.email,
    subject: 'AYCM — Demande d’adhésion reçue',
    html: `<p>Bonjour ${m.firstName},</p><p>Nous avons bien reçu votre demande d'adhésion à AYCM. Nous reviendrons vers vous rapidement.</p><p>L'équipe AYCM</p>`,
  });

  res.status(201).json({ success: true, membership: m });
});

// GET /api/memberships (admin)
exports.list = asyncHandler(async (req, res) => {
  const where = req.query.status ? { status: req.query.status } : {};
  const items = await Membership.findAll({ where, order: [['createdAt', 'DESC']] });
  res.json({ success: true, items });
});

// PATCH /api/memberships/:id (admin)
exports.updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Statut invalide' });
  }
  const m = await Membership.findByPk(req.params.id);
  if (!m) return res.status(404).json({ success: false, message: 'Introuvable' });
  await m.update({ status });
  res.json({ success: true, membership: m });
});
