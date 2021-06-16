const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema({
  _id: String,
  videoTitle: String,
  channelName: String,
  level: String,
  thumbnail: String,
  avatar: String,
});
const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
