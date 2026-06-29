const router = require('express').Router();
const c = require('../controllers/president.controller');
const { protect, adminOnly } = require('../middlewares/auth');

router.get('/', c.getActive);
router.get('/history', protect, adminOnly, c.history);
router.post('/', protect, adminOnly, c.create);
router.put('/:id', protect, adminOnly, c.update);

module.exports = router;
