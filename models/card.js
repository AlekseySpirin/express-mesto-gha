const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  places: [
    {
      name: {
        type: String,
        minLength: 2,
        maxLength: 30,
        require: true,
      },
      link: {
        type: String,
        minLength: 2,
        maxLength: 30,
        require: true,
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
      },
      likes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('card', cardSchema);
