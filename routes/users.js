const router = require("express").Router();

const {
  getUsers,
  getUsersById,
  updateUserById,
  updateUserAvatarById,
  getCurrentUser
} = require("../controllers/users");
const {
  getUserByIdValidator,
  updateUserValidator
} = require("../validation/validationRules");

router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.get("/:userId", getUserByIdValidator, getUsersById);

router.patch("/me", updateUserValidator, updateUserById);

router.patch("/me/avatar", updateUserAvatarById);

module.exports = router;
