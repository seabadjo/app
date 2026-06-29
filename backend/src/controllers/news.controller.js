const { Op } = require('sequelize');
const slugify = require('slugify');
const { News } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

const makeSlug = (s) => slugify(s, { lower: true, strict: true });

// GET /api/news
exports.list = asyncHandler(async (req, res) => {
  const { category, page = 1, limit = 10, search } = req.query;
  const where = { isPublished: true };
  if (category) where.category = category.toUpperCase();
  if (search) where[Op.or] = [
    { title: { [Op.iLike]: `%${search}%` } },
    { content: { [Op.iLike]: `%${search}%` } },
  ];

  const offset = (page - 1) * limit;
  const { rows: items, count: total } = await News.findAndCountAll({
    where,
    order: [['publishedAt', 'DESC']],
    offset,
    limit: Number(limit),
  });
  res.json({ success: true, total, page: Number(page), items });
});

// GET /api/news/:slug
exports.getOne = asyncHandler(async (req, res) => {
  const item = await News.findOne({ where: { slug: req.params.slug } });
  if (!item) return res.status(404).json({ success: false, message: 'Actualité introuvable' });
  res.json({ success: true, item });
});

// POST /api/news (admin)
exports.create = asyncHandler(async (req, res) => {
  const data = { ...req.body, authorId: req.user.id };
  if (!data.slug) data.slug = makeSlug(data.title);
  const item = await News.create(data);
  res.status(201).json({ success: true, item });
});

// PUT /api/news/:id (admin)
exports.update = asyncHandler(async (req, res) => {
  const item = await News.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Actualité introuvable' });
  await item.update(req.body);
  res.json({ success: true, item });
});

// DELETE /api/news/:id (admin)
exports.remove = asyncHandler(async (req, res) => {
  await News.destroy({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Supprimé' });
});
