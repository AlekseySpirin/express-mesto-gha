const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    minLength: 2,
    maxLength: 30,
    require: true,
  },
});

module.exports = mongoose.model('user', userSchema);
