const router = require("express").Router();

const {
  getUsers,
  getUsersById,
  createUser,
  updateUserById,
  updateUserAvatarById,
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/:userId", getUsersById);

router.post("/", createUser);

router.patch("/me", updateUserById);

router.patch("/me/avatar", updateUserAvatarById);

module.exports = router;
