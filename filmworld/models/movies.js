const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    ID: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    owner: {
      type: String,
      required: true
    },
    charges: {
      type: Number,
      required: true
    },
    tags: {
      type: Array,
      required: false
    },
    imageUrl: {
      type: String,
      required: true
    },
    broadcaster: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
