const { EthicsCode } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
  const items = await EthicsCode.findAll({ order: [['order', 'ASC']] });
  res.json({ success: true, items });
});

exports.getOne = asyncHandler(async (req, res) => {
  const item = await EthicsCode.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Code éthique introuvable' });
  res.json({ success: true, item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await EthicsCode.create(req.body);
  res.status(201).json({ success: true, item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await EthicsCode.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Introuvable' });
  await item.update(req.body);
  res.json({ success: true, item });
});

exports.remove = asyncHandler(async (req, res) => {
  await EthicsCode.destroy({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Supprimé' });
});
