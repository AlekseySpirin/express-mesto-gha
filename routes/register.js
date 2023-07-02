const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { createUser } = require("../controllers/register");

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }),
  createUser
);

module.exports = router;
