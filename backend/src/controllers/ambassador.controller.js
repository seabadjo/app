const { Ambassador } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

// POST /api/ambassadors
exports.apply = asyncHandler(async (req, res) => {
  const a = await Ambassador.create(req.body);
  res.status(201).json({ success: true, ambassador: a });
});

// GET /api/ambassadors (admin)
exports.list = asyncHandler(async (req, res) => {
  const where = req.query.status ? { status: req.query.status } : {};
  const items = await Ambassador.findAll({ where, order: [['createdAt', 'DESC']] });
  res.json({ success: true, items });
});

// PATCH /api/ambassadors/:id (admin)
exports.updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const a = await Ambassador.findByPk(req.params.id);
  if (!a) return res.status(404).json({ success: false, message: 'Introuvable' });
  await a.update({ status });
  res.json({ success: true, ambassador: a });
});
