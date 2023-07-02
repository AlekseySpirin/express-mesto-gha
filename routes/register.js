const router = require("express").Router();
const { createUser } = require("../controllers/register");

router.post("/signup", createUser);

module.exports = router;
