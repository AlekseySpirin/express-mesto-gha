const router = require("express").Router();
const { errors } = require("celebrate");
const userRoutes = require("./users");
const cardRoutes = require("./cards");
const loginRouter = require("./login");
const registerRouter = require("./register");
const { notFound } = require("../middlewares/notFound");
const { errorHandler } = require("../middlewares/errorHandler");
const { auth } = require("../middlewares/auth");
const { celebrateError } = require("../middlewares/celebrateError");

router.use("/", loginRouter);

router.use("/", registerRouter);

router.use(auth);

router.use("/users", userRoutes);

router.use("/cards", cardRoutes);

router.use(notFound);

router.use(errorHandler);

router.use(errors());

router.use(celebrateError);
module.exports = router;
