const router = require("express").Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likedCard,
  dislikedCard
} = require("../controllers/cards");
const { createCardValidator } = require("../validation/validationRules");

router.get("/", getCards);

router.post("/", createCardValidator, createCard);

router.delete("/:cardId", deleteCardById);

router.put("/:cardId/likes", likedCard);

router.delete("/:cardId/likes", dislikedCard);

module.exports = router;
