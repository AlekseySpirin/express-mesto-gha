const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
  next();
};

module.exports = {
  errorHandler
};
