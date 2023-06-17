const router = require('express').Router();

const {
  getUsers,
  getUsersById,
  createUser,
  // updateUserById,
  // deleteUserById,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUsersById);

router.post('/', createUser);

// router.patch('/:id', updateUserById);
//
// router.delete('/:id', deleteUserById);

module.exports = router;
