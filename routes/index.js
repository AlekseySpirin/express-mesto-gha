const router = require("express").Router();
const userRoutes = require("./users");
const cardRoutes = require("./cards");
const { notFound } = require("../middlewares/notFound");

router.get("/", (req, res) => {
  res.send("hello!!!");
});

router.use("/users", userRoutes);
router.use("/cards", cardRoutes);
router.use(notFound);
module.exports = router;
