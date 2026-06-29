const { User } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/users (admin)
exports.list = asyncHandler(async (req, res) => {
  const items = await User.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, items });
});

// GET /api/users/:id
exports.getOne = asyncHandler(async (req, res) => {
  const item = await User.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
  res.json({ success: true, item });
});

// PUT /api/users/me
exports.updateMe = asyncHandler(async (req, res) => {
  const allowed = ['firstName', 'lastName', 'phone', 'country', 'avatar', 'bio'];
  const update = {};
  allowed.forEach((k) => { if (req.body[k] !== undefined) update[k] = req.body[k]; });
  await req.user.update(update);
  res.json({ success: true, user: req.user });
});
