const notFound = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
};

const notFoundError = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
  next();
};

module.exports = {
  notFound,
  notFoundError,
};
