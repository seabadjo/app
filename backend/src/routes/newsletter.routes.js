const router = require('express').Router();
const c = require('../controllers/newsletter.controller');
const { protect, adminOnly } = require('../middlewares/auth');

router.post('/subscribe', c.subscribe);
router.post('/unsubscribe', c.unsubscribe);
router.get('/', protect, adminOnly, c.list);

module.exports = router;
