const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { login } = require("../controllers/login");

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .uri({ scheme: ["http", "https"] })
        .regex(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp)$/i),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }),
  login
);

module.exports = router;
