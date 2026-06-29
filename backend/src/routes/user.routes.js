const router = require('express').Router();
const c = require('../controllers/user.controller');
const { protect, adminOnly } = require('../middlewares/auth');

router.put('/me', protect, c.updateMe);
router.get('/', protect, adminOnly, c.list);
router.get('/:id', protect, adminOnly, c.getOne);

module.exports = router;
