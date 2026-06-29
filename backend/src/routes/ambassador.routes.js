const router = require('express').Router();
const c = require('../controllers/ambassador.controller');
const { protect, adminOnly } = require('../middlewares/auth');

router.post('/', c.apply);
router.get('/', protect, adminOnly, c.list);
router.patch('/:id', protect, adminOnly, c.updateStatus);

module.exports = router;
