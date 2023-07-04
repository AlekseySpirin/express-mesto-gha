const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.message === "NotValidId") {
    return res
      .status(404)
      .send({ message: "Такого пользователя не существует" });
  }
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message
  });
  next();
};

module.exports = {
  errorHandler
};
