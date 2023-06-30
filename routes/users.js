const router = require("express").Router();

const {
  getUsers,
  getUsersById,
  createUser,
  updateUserById,
  updateUserAvatarById,
  login
} = require("../controllers/users");

router.get("/users", getUsers);

router.get("/users/:userId", getUsersById);

router.post("/signin", login);

router.post("/signup", createUser);

router.patch("/users/me", updateUserById);

router.patch("/users/me/avatar", updateUserAvatarById);

module.exports = router;
