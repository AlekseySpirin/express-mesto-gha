const User = require('../models/user');

const getUsers = (req, res) => {
  return User.find({}).then((users) => {
    return res.status(200).send(users);
  });
};

const getUsersById = (req, res) => {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(200).send(user);
    })
    .catch(() => {
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const newUser = req.body;
  return User.create(newUser)
    .then((user) => {
      return res.status(201).send(user);
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

const updateUserById = (req, res) => {
  const newUserData = req.body;
  const { _id } = req.user;
  return User.findByIdAndUpdate(_id, newUserData, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(200).send(user);
    })
    .catch(() => {
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const updateUserAvatarById = (req, res) => {
  const { avatar } = req.body;
  console.log(avatar);
  const { _id } = req.user;
  return User.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((newAvatar) => {
      return res.status(200).send(newAvatar);
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
  getUsers,
  getUsersById,
  createUser,
  updateUserById,
  updateUserAvatarById,
};
