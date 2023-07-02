const { Types } = require("mongoose");
const Card = require("../models/card");
const {
  checkServerError,
  checkValidationError // incorrectData,
} = require("../utils/errors");

const checkCard = (req, res) => {
  res.status(404).send({ message: "Такой карточки не существует" });
};

const getCards = (req, res) => {
  return Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch(() => {
      return checkServerError(req, res);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({
    name,
    link,
    owner
  })
    .then((card) => {
      return res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return checkValidationError(req, res, err);
      }
      return checkServerError(req, res);
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  if (!Types.ObjectId.isValid(cardId)) {
    return res.status(400).send({ message: "Некорректный id" });
  }

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return checkCard(req, res);
      }
      if (card.owner._id !== userId) {
        return res
          .status(403)
          .send({ message: "Нет прав на удаление карточки" });
      }
      return (
        Card.findByIdAndDelete(cardId)
          // eslint-disable-next-line no-shadow
          .then((card) => {
            if (!card) {
              return checkCard(req, res);
            }
            return res.status(200).send(card);
          })
          .catch((err) => {
            if (err.name === "ValidationError") {
              return checkValidationError(req, res, err);
            }
            return checkServerError(req, res);
          })
      );
    })
    .catch(() => {
      return checkServerError(req, res);
    });
};

const likedCard = (req, res) => {
  const { cardId } = req.params;
  if (!Types.ObjectId.isValid(cardId)) {
    return res.status(400).send({ message: "Некорректный id" });
  }
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return checkCard(req, res);
      }
      return res.status(200).send(card);
    })
    .catch(() => {
      return checkServerError(req, res);
    });
};

const dislikedCard = (req, res) => {
  const { cardId } = req.params;
  if (!Types.ObjectId.isValid(cardId)) {
    return res.status(400).send({ message: "Некорректный id" });
  }
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return checkCard(req, res);
      }
      return res.status(200).send({ message: "Лайк удален" });
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
  dislikedCard
};
