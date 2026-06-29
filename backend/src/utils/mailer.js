const nodemailer = require('nodemailer');

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    } : undefined,
  });
  return transporter;
}

exports.sendMail = async ({ to, subject, html, text }) => {
  if (!process.env.SMTP_HOST) {
    console.warn('[MAIL] SMTP non configuré — email simulé :', { to, subject });
    return { simulated: true };
  }
  return getTransporter().sendMail({
    from: process.env.MAIL_FROM || 'no-reply@aycm.org',
    to,
    subject,
    html,
    text,
  });
};
