const jwt = require('jsonwebtoken');
const { User } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, country } = req.body;
  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(409).json({ success: false, message: 'Email déjà utilisé' });

  const user = await User.create({ firstName, lastName, email, password, phone, country });
  const token = signToken(user.id);
  res.status(201).json({
    success: true,
    token,
    user: { id: user.id, firstName, lastName, email, role: user.role },
  });
});

// POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.scope('withPassword').findOne({ where: { email } });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ success: false, message: 'Identifiants invalides' });
  }
  const token = signToken(user.id);
  res.json({
    success: true,
    token,
    user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role },
  });
});

// GET /api/auth/me
exports.me = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});
