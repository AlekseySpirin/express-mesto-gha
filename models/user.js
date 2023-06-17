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
  },
  email: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  places: [
    {
      name: {
        type: String,
        minLength: 2,
        maxLength: 30,
      },
      link: {
        type: String,
        minLength: 2,
        maxLength: 30,
      },
      like: {
        type: Boolean,
        default: false,
        liked: [],
      },
    },
  ],
});

module.exports = mongoose.model('user', userSchema);
