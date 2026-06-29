const { Pillar } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
  const items = await Pillar.findAll({ order: [['order', 'ASC']] });
  res.json({ success: true, items });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await Pillar.create(req.body);
  res.status(201).json({ success: true, item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await Pillar.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Pilier introuvable' });
  await item.update(req.body);
  res.json({ success: true, item });
});

exports.remove = asyncHandler(async (req, res) => {
  await Pillar.destroy({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Supprimé' });
});
