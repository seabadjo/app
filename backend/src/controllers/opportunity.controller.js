const slugify = require('slugify');
const { Opportunity } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

const makeSlug = (s) => slugify(s, { lower: true, strict: true });

// GET /api/opportunities
exports.list = asyncHandler(async (req, res) => {
  const { type, active = 'true' } = req.query;
  const where = {};
  if (active === 'true') where.isActive = true;
  if (type) where.type = type;

  const items = await Opportunity.findAll({ where, order: [['deadline', 'ASC']] });
  res.json({ success: true, items });
});

// GET /api/opportunities/:slug
exports.getOne = asyncHandler(async (req, res) => {
  const item = await Opportunity.findOne({ where: { slug: req.params.slug } });
  if (!item) return res.status(404).json({ success: false, message: 'Opportunité introuvable' });
  res.json({ success: true, item });
});

// POST /api/opportunities (admin)
exports.create = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (!data.slug) data.slug = makeSlug(data.title);
  const item = await Opportunity.create(data);
  res.status(201).json({ success: true, item });
});

// PUT /api/opportunities/:id (admin)
exports.update = asyncHandler(async (req, res) => {
  const item = await Opportunity.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Opportunité introuvable' });
  await item.update(req.body);
  res.json({ success: true, item });
});

// DELETE /api/opportunities/:id (admin)
exports.remove = asyncHandler(async (req, res) => {
  await Opportunity.destroy({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Supprimé' });
});
