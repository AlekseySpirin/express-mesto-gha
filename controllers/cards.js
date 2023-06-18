const Card = require('../models/card');
const { checkServerError, checkValidationError } = require('../utils/errors');

const checkCard = (req, res) => {
  res.status(404).send({ message: 'Такой карточки не существует' });
};

const getCards = (req, res) => {
  return Card.find({})
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch(() => {
      return checkServerError(req, res);
    });
};

const createCard = (req, res) => {
  const newCard = req.body;
  console.log(newCard);
  return Card.create(newCard)
    .then((card) => {
      return res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return checkValidationError(req, res, err);
      }
      return checkServerError(req, res);
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  return Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return checkCard(req, res);
      }
      return res.status(201).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return checkValidationError(req, res, err);
      }
      return checkServerError(req, res);
    });
};

const likedCard = (req, res) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return checkCard(req, res);
      }
      return res.status(201).send({ message: 'Лайк добавлен' });
    })
    .catch(() => {
      return checkServerError(req, res);
    });
};

const dislikedCard = (req, res) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return checkCard(req, res);
      }
      return res.status(201).send({ message: 'Лайк удален' });
    })
    .catch(() => {
      return checkServerError(req, res);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likedCard,
  dislikedCard,
};
