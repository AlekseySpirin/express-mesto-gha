const router = require("express").Router();

const {
  getUsers,
  getUsersById,
  updateUserById,
  updateUserAvatarById,
  getCurrentUser
} = require("../controllers/users");
// eslint-disable-next-line import/no-unresolved
const { getUserByIdValidator } = require("../validation/validationRules");

router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.get("/:userId", getUserByIdValidator, getUsersById);

router.patch("/me", updateUserById);

router.patch("/me/avatar", updateUserAvatarById);

module.exports = router;
