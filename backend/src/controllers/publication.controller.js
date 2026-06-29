const { Op } = require('sequelize');
const slugify = require('slugify');
const { Publication } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

const makeSlug = (s) => slugify(s, { lower: true, strict: true });

// GET /api/publications
exports.list = asyncHandler(async (req, res) => {
  const { type, page = 1, limit = 10, search } = req.query;
  const where = { isPublished: true };
  if (type) where.type = type;
  if (search) where[Op.or] = [
    { title: { [Op.iLike]: `%${search}%` } },
    { description: { [Op.iLike]: `%${search}%` } },
  ];

  const offset = (page - 1) * limit;
  const { rows: items, count: total } = await Publication.findAndCountAll({
    where,
    order: [['publishedAt', 'DESC']],
    offset,
    limit: Number(limit),
  });
  res.json({ success: true, total, page: Number(page), items });
});

exports.getOne = asyncHandler(async (req, res) => {
  const item = await Publication.findOne({ where: { slug: req.params.slug } });
  if (!item) return res.status(404).json({ success: false, message: 'Publication introuvable' });
  res.json({ success: true, item });
});

// POST /api/publications/:id/download
exports.trackDownload = asyncHandler(async (req, res) => {
  const item = await Publication.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Introuvable' });
  await item.increment('downloadCount');
  await item.reload();
  res.json({ success: true, downloadCount: item.downloadCount, fileUrl: item.fileUrl });
});

exports.create = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (!data.slug) data.slug = makeSlug(data.title);
  const item = await Publication.create(data);
  res.status(201).json({ success: true, item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await Publication.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Introuvable' });
  await item.update(req.body);
  res.json({ success: true, item });
});

exports.remove = asyncHandler(async (req, res) => {
  await Publication.destroy({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Supprimé' });
});
