const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.get('/', (req, res) => {
  res.send('hello!!!');
});

router.use('/users', userRoutes);
router.use('/card', cardRoutes);

module.exports = router;
