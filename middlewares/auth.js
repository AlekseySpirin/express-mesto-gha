const { verifyToken } = require("../utils/jwt");

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!verifyToken(token)) {
    return res.status(401).send({ message: "Нет доступа" });
  }

  return next();
};
module.exports = {
  auth
};
