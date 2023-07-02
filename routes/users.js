const router = require("express").Router();

const {
  getUsers,
  getUsersById,
  updateUserById,
  updateUserAvatarById,
  getCurrentUser
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.get("/:userId", getUsersById);

router.patch("/me", updateUserById);

router.patch("/me/avatar", updateUserAvatarById);

module.exports = router;
