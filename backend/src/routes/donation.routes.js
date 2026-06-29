const router = require('express').Router();
const c = require('../controllers/donation.controller');
const { protect, adminOnly } = require('../middlewares/auth');

router.post('/', c.create);
router.post('/:id/confirm', c.confirm);
router.get('/', protect, adminOnly, c.list);

module.exports = router;
