const checkServerError = (req, res) => {
  res.status(500).send({ message: 'Ошибка на сервере' });
};

const checkValidationError = (req, res, err) => {
  res.status(400).send({
    message: `${Object.values(err.errors)
      .map((error) => error.message)
      .join(', ')}`,
  });
};

const incorrectData = (req, res, err) => {
  return res.status(400).send({
    message: `${Object.values(err.errors)
      .map((error) => error.message)
      .join(', ')}`,
  });
};

module.exports = {
  checkServerError,
  checkValidationError,
  incorrectData,
};
