const { PresidentMessage } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/president
exports.getActive = asyncHandler(async (req, res) => {
  const item = await PresidentMessage.findOne({
    where: { isActive: true },
    order: [['updatedAt', 'DESC']],
  });
  if (!item) return res.status(404).json({ success: false, message: 'Aucun mot du président défini' });
  res.json({ success: true, item });
});

// POST /api/president (admin)
exports.create = asyncHandler(async (req, res) => {
  await PresidentMessage.update({ isActive: false }, { where: {} });
  const item = await PresidentMessage.create({ ...req.body, isActive: true });
  res.status(201).json({ success: true, item });
});

// PUT /api/president/:id (admin)
exports.update = asyncHandler(async (req, res) => {
  const item = await PresidentMessage.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Introuvable' });
  await item.update(req.body);
  res.json({ success: true, item });
});

// GET /api/president/history (admin)
exports.history = asyncHandler(async (req, res) => {
  const items = await PresidentMessage.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, items });
});
