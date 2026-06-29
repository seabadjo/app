const router = require('express').Router();
const c = require('../controllers/contact.controller');
const { protect, adminOnly } = require('../middlewares/auth');

router.post('/', c.send);
router.get('/', protect, adminOnly, c.list);
router.patch('/:id/read', protect, adminOnly, c.markRead);

module.exports = router;
