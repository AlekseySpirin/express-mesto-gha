const { celebrate, Joi, Segments } = require("celebrate");
const {
  nameSchema,
  aboutSchema,
  avatarSchema,
  emailSchema,
  passwordSchema
} = require("./joiSchemas");
// eslint-disable-next-line import/order
const { ObjectId } = require("mongoose").Types;

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: nameSchema,
    about: aboutSchema,
    avatar: avatarSchema,
    email: emailSchema,
    password: passwordSchema
  })
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: nameSchema,
    about: aboutSchema
  })
});

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
  getUserByIdValidator,
  createUserValidator,
  updateUserValidator
};
