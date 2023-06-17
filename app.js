const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const { join } = require('path');
const routes = require('./routes');

const { PORT = 3005 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodatabase', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('База подключена');
  });

const app = express();

app.use(express.static(join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => {
  console.log('start server');
});
