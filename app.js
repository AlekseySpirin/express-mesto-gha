const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { join } = require("path");
const { errors } = require("celebrate");
const routes = require("./routes");
const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");
const { celebrateError } = require("./middlewares/celebrateError");

const { PORT = 3000 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("База подключена");
  });

const app = express();
app.use(express.static(join(__dirname, "public")));
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(notFound);

app.use(routes);

app.use(errors());
app.use(errorHandler);
app.use(celebrateError);

app.listen(PORT, () => {
  console.log("Сервер запущен");
});
