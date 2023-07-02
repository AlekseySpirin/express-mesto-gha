const { Types } = require("mongoose");
const User = require("../models/user");
const { checkServerError, checkValidationError } = require("../utils/errors");
const { decryptToken } = require("../utils/jwt");

const checkUser = (req, res) => {
  res.status(404).send({ message: "Такого пользователя не существует" });
};

const getCurrentUser = (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);
  const currentUserId = decryptToken(token);
  console.log(currentUserId);
  return User.findById(currentUserId)
    .orFail(new Error("NotValidId"))
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === "NotValidId") {
        return checkUser(req, res);
      }
      if (!Types.ObjectId.isValid(currentUserId)) {
        return res.status(400).send({ message: "Некорректный id" });
      }
      return checkServerError(req, res);
    });
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

  return User.findById(userId)
    .orFail(new Error("NotValidId"))
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === "NotValidId") {
        return checkUser(req, res);
      }
      if (!Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ message: "Некорректный id" });
      }
      return checkServerError(req, res);
    });
};

const updateUserById = (req, res) => {
  const newUserData = req.body;
  const { _id } = req.user;
  return User.findByIdAndUpdate(_id, newUserData, {
    new: true,
    runValidators: true
  })
    .orFail(new Error("NotValidId"))
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === "NotValidId") {
        return checkUser(req, res);
      }
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
      runValidators: true
    }
  )
    .orFail(new Error("NotValidId"))
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === "NotValidId") {
        return checkUser(req, res);
      }
      if (err.name === "ValidationError") {
        return checkValidationError(req, res, err);
      }
      return checkServerError(req, res);
    });
};

module.exports = {
  getUsers,
  getUsersById,
  updateUserById,
  updateUserAvatarById,
  getCurrentUser
};
