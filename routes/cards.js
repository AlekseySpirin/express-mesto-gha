const router = require('express').Router();

const { getCards, getUsersById, createUser } = require('../controllers/cards');

router.get('/', getCards);

// router.get('/:userId', getUsersById);
//
// router.post('/', createUser);

// router.patch('/:id', updateUserById);
//
// router.delete('/:id', deleteUserById);

module.exports = router;
