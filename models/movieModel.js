const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A movie must have a title"],
      unique: true,
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "A movie must have a year"],
    },
    genre: {
      type: String,
      required: [true, "A movie must have a genre"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Movie", movieSchema);