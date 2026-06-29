const { ContactMessage } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const { sendMail } = require('../utils/mailer');

// POST /api/contact
exports.send = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Champs requis manquants' });
  }
  const msg = await ContactMessage.create({ name, email, subject, message });

  await sendMail({
    to: process.env.MAIL_TO || 'contact@aycm.org',
    subject: `[Contact AYCM] ${subject || 'Nouveau message'}`,
    html: `<p><b>De :</b> ${name} (${email})</p><p>${message}</p>`,
    text: `De: ${name} (${email})\n\n${message}`,
  });

  res.status(201).json({ success: true, message: 'Message envoyé', id: msg.id });
});

// GET /api/contact (admin)
exports.list = asyncHandler(async (req, res) => {
  const items = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, items });
});

// PATCH /api/contact/:id/read (admin)
exports.markRead = asyncHandler(async (req, res) => {
  const item = await ContactMessage.findByPk(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Introuvable' });
  await item.update({ isRead: true });
  res.json({ success: true, item });
});
