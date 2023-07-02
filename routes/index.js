const router = require("express").Router();
const userRoutes = require("./users");
const cardRoutes = require("./cards");
const loginRouter = require("./login");
const registerRouter = require("./register");
const { notFound } = require("../middlewares/notFound");
const { auth } = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.send("hello!!!");
});

router.use("/", loginRouter);

router.use("/", registerRouter);

router.use(auth);

router.use("/users", userRoutes);

router.use("/cards", cardRoutes);

router.use(notFound);

module.exports = router;
