const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  _id: String,
  videoTitle: String,
  channelName: String,
  level: String,
  thumbnail: String,
  avatar: String,
});
const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
