const mongoose = require("mongoose");
const { Video } = require("./video.model");
const { User } = require("./user.model");
const {Schema} = mongoose;
const noteSchema = new Schema(
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
      type: Schema.Types.ObjectId,
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
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = { Note };
