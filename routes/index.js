const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.get('/', (req, res) => {
  res.send('hello!!!');
});

router.use((req, res, next) => {
  req.user = {
    _id: '648ec99e0e83571338a9f641',
  };
  console.log(req.user);
  next();
});

router.use('/users', userRoutes);
router.use('/card', cardRoutes);

module.exports = router;
