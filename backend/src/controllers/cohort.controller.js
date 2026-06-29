const { CohortMember } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/cohort?year=2024&featured=true
exports.list = asyncHandler(async (req, res) => {
  const { year, featured } = req.query;
  const where = {};
  if (year) where.cohortYear = Number(year);
  if (featured === 'true') where.isFeatured = true;

  const items = await CohortMember.findAll({
    where,
    order: [['order', 'ASC'], ['createdAt', 'DESC']],
  });
  res.json({ success: true, items });
});

exports.getOne = asyncHandler(async (req, res) => {
  const item = await CohortMember.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Membre introuvable' });
  res.json({ success: true, item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await CohortMember.create(req.body);
  res.status(201).json({ success: true, item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await CohortMember.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Introuvable' });
  await item.update(req.body);
  res.json({ success: true, item });
});

exports.remove = asyncHandler(async (req, res) => {
  await CohortMember.destroy({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Supprimé' });
});
