const { verifyToken } = require("../utils/jwt");

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!verifyToken(token)) {
    const error = new Error("Нет доступа");
    error.statusCode = 401;
    return next(error);
  }

  return next();
};
module.exports = {
  auth
};
