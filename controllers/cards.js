const Card = require('../models/card');

const getCards = (req, res) => {
  return Card.find({}).then((cards) => {
    return res.status(200).send(cards);
  });
};

const createCard = (req, res) => {
  const newCard = req.body;
  return (
    Card.create(newCard)
      // eslint-disable-next-line no-shadow
      .then((newCard) => {
        return res.status(201).send(newCard);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(400).send({
            message: `${Object.values(err.errors)
              .map((error) => error.message)
              .join(', ')}`,
          });
        }
        return res.status(500).send({ message: 'Ошибка на сервере' });
      })
  );
};

const deleteCardById = (req, res) => {
  const { id } = req.params;
  return Card.findByIdAndDelete(id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(201).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
};
