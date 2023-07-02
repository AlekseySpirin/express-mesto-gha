const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = "super-puper-secret-key";
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) return false;

    return User.findById(decoded.id).then((user) => {
      return Boolean(user);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken
};
