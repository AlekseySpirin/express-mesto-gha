const { celebrate, Segments } = require("celebrate");
const Joi = require("joi");
const {
  nameSchema,
  aboutSchema,
  avatarSchema,
  emailSchema,
  passwordSchema,
  namePlaceSchema,
  linkSchema
} = require("./joiSchemas");
// eslint-disable-next-line import/order
const { ObjectId } = require("mongoose").Types;

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: namePlaceSchema,
    link: linkSchema
  })
});

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

const updateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: avatarSchema
  })
});

const getByIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    Id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!ObjectId.isValid(value)) {
          return helpers.message("Некорректный id");
        }
        return value;
      })
  })
});

module.exports = {
  getByIdValidator,
  createUserValidator,
  updateUserValidator,
  updateUserAvatar,
  createCardValidator
};
