const router = require("express").Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likedCard,
  dislikedCard
} = require("../controllers/cards");
const {
  getByIdValidator,
  createCardValidator
} = require("../validation/validationRules");

router.get("/", getCards);

router.post("/", createCardValidator, createCard);

router.delete("/:cardId", getByIdValidator, deleteCardById);

router.put("/:cardId/likes", getByIdValidator, likedCard);

router.delete("/:cardId/likes", getByIdValidator, dislikedCard);

module.exports = router;
