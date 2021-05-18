const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  _id: String,
  videoTitle: String,
  channelName: String,
  level: String,
  thumbnail: String,
  avatar: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});
const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
