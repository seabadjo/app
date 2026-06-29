const { Media } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/media
exports.list = asyncHandler(async (req, res) => {
  const { type, category, page = 1, limit = 12, featured } = req.query;
  const where = {};
  if (type) where.type = type;
  if (category) where.category = category;
  if (featured === 'true') where.isFeatured = true;

  const offset = (page - 1) * limit;
  const { rows: items, count: total } = await Media.findAndCountAll({
    where,
    order: [['takenAt', 'DESC'], ['createdAt', 'DESC']],
    offset,
    limit: Number(limit),
  });
  res.json({ success: true, total, page: Number(page), items });
});

exports.getOne = asyncHandler(async (req, res) => {
  const item = await Media.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Média introuvable' });
  res.json({ success: true, item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await Media.create(req.body);
  res.status(201).json({ success: true, item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await Media.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Introuvable' });
  await item.update(req.body);
  res.json({ success: true, item });
});

exports.remove = asyncHandler(async (req, res) => {
  await Media.destroy({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Supprimé' });
});
