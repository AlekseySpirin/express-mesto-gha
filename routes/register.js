const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { createUser } = require("../controllers/register");
const {
  nameSchema,
  aboutSchema,
  avatarSchema,
  emailSchema,
  passwordSchema
} = require("../validation/joiSchemas");

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: nameSchema,
      about: aboutSchema,
      avatar: avatarSchema,
      email: emailSchema,
      password: passwordSchema
    })
  }),
  createUser
);

module.exports = router;
