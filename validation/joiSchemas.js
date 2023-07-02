// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require("joi");

const nameSchema = Joi.string().min(2).max(30);
const aboutSchema = Joi.string().min(2).max(30);
const avatarSchema = Joi.string()
  .uri({ scheme: ["http", "https"] })
  .regex(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp)$/i);
const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().required();

module.exports = {
  nameSchema,
  aboutSchema,
  avatarSchema,
  emailSchema,
  passwordSchema
};
