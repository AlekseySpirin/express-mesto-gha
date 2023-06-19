const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const { join } = require("path");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/notFound");

const { PORT = 3000 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("База подключена");
  });

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: "648ec99e0e83571338a9f641"
  };
  next();
});

app.use(express.static(join(__dirname, "public")));
app.use(helmet());
app.use(bodyParser.json());

app.use(routes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Сервер запущен");
});
