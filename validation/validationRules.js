const { celebrate, Joi, Segments } = require("celebrate");
const { ObjectId } = require("mongoose").Types;

const getUserByIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!ObjectId.isValid(value)) {
          return helpers.message("Некорректный id пользователя");
        }
        return value;
      })
  })
});

module.exports = {
  getUserByIdValidator
};
