const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");
const UnauthorizedError = require("../errors/unauthorizedError");

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new UnauthorizedError("Неправильный email или пароль");
  }

  return User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Такого пользователя не существует");
      }
      return bcrypt.compare(password, user.password, (err, isPasswordMatch) => {
        if (!isPasswordMatch) {
          return res.status(401).send({ message: "Неправильный пароль" });
        }
        const token = generateToken(user._id);
        res.cookie("jwt", token, {
          maxAge: 6048000,
          httpOnly: true,
          sameSite: true,
        });
        return res.status(200).send({ message: "Авторизация прошла успешно" });
      });
    })
    .catch(next);
};

module.exports = {
  login,
};
