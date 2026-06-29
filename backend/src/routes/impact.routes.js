const router = require('express').Router();
const c = require('../controllers/impact.controller');
const { protect, adminOnly } = require('../middlewares/auth');

router.get('/', c.list);
router.post('/', protect, adminOnly, c.upsert);
router.delete('/:id', protect, adminOnly, c.remove);

module.exports = router;
