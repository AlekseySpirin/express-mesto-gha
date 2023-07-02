const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");
const { checkValidationError, checkServerError } = require("../utils/errors");

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).send({ message: "Неправильный email или пароль" });
  }

  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(403)
          .send({ message: "Такого пользователя не существует" });
      }
      return bcrypt.compare(
        password,
        user.password,
        function (err, isPasswordMatch) {
          if (!isPasswordMatch) {
            return res.status(403).send({ message: "Неправильный пароль" });
          }
          const token = generateToken(user._id);
          res.cookie("jwt", token, { httpOnly: true });
          return res
            .status(200)
            .send({ message: "Авторизация прошла успешно" });
        }
      );
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return checkValidationError(req, res, err);
      }
      return checkServerError(req, res);
    });
};

module.exports = {
  login
};
