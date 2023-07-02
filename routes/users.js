const router = require("express").Router();

const {
  getUsers,
  getUsersById,
  updateUserById,
  updateUserAvatarById,
  getCurrentUser
} = require("../controllers/users");
const {
  getByIdValidator,
  updateUserValidator,
  updateUserAvatar
} = require("../validation/validationRules");

router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.get("/:userId", getByIdValidator, getUsersById);

router.patch("/me", updateUserValidator, updateUserById);

router.patch("/me/avatar", updateUserAvatar, updateUserAvatarById);

module.exports = router;
