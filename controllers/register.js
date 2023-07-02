const bcrypt = require("bcrypt");
const User = require("../models/user");
const { checkValidationError, checkServerError } = require("../utils/errors");

const SALT_ROUNDS = 10;
const createUser = (req, res) => {
  const {
    name = "Жак-Ив Кусто",
    about = "Исследователь",
    avatar = "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    email,
    password
  } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "Не передан email или пароль" });
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(409).send({ message: "Пользователь уже существует" });
      }
      return bcrypt.hash(password, SALT_ROUNDS, function (err, hash) {
        return User.create({
          name,
          about,
          avatar,
          email,
          password: hash
        }).then((userData) => {
          return res.status(201).send({
            name: userData.name,
            about: userData.about,
            avatar: userData.avatar,
            email: userData.email
          });
        });
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return checkValidationError(req, res, err);
      }
      return checkServerError(req, res);
    });
};

module.exports = {
  createUser
};
