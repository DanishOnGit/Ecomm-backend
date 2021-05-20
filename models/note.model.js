const mongoose = require("mongoose");
const { Video } = require("./video.model");
const { User } = require("./user.model");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      type: String,
      ref: "Video",
    },
    notedAt: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = { Note };
