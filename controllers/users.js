const { Types } = require("mongoose");
const User = require("../models/user");
const {
  checkServerError,
  checkValidationError,
  incorrectData,
} = require("../utils/errors");

const checkUser = (req, res) => {
  res.status(404).send({ message: "Такого пользователя не существует" });
};

const getUsers = (req, res) => {
  return User.find({})
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch(() => {
      return checkServerError(req, res);
    });
};

const getUsersById = (req, res) => {
  const { userId } = req.params;
  if (!Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ message: "Некорректный id" });
  }
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return checkUser(req, res);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "SomeErrorName") {
        incorrectData(req, res, err);
      }
      return checkServerError(req, res);
    });
};

const createUser = (req, res) => {
  const newUser = req.body;
  return User.create(newUser)
    .then((user) => {
      return res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return checkValidationError(req, res, err);
      }
      return checkServerError(req, res);
    });
};

const updateUserById = (req, res) => {
  const newUserData = req.body;
  const { _id } = req.user;
  return User.findByIdAndUpdate(_id, newUserData, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return checkUser(req, res);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return checkValidationError(req, res, err);
      }
      return checkServerError(req, res);
    });
};

const updateUserAvatarById = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  return User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return checkUser(req, res);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return checkValidationError(req, res, err);
      }
      return checkServerError(req, res);
    });
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUserById,
  updateUserAvatarById,
};
