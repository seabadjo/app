const { Impact } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
  const items = await Impact.findAll({ order: [['order', 'ASC']] });
  res.json({ success: true, items });
});

exports.upsert = asyncHandler(async (req, res) => {
  const { label } = req.body;
  const existing = await Impact.findOne({ where: { label } });
  let item;
  if (existing) {
    await existing.update(req.body);
    item = existing;
  } else {
    item = await Impact.create(req.body);
  }
  res.json({ success: true, item });
});

exports.remove = asyncHandler(async (req, res) => {
  await Impact.destroy({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Supprimé' });
});
