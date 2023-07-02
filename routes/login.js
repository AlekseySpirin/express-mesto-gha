const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { login } = require("../controllers/login");
const {
  nameSchema,
  aboutSchema,
  avatarSchema,
  emailSchema,
  passwordSchema
} = require("../validation/joiSchemas");

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      name: nameSchema,
      about: aboutSchema,
      avatar: avatarSchema,
      email: emailSchema,
      password: passwordSchema
    })
  }),
  login
);

module.exports = router;
