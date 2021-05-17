const mongoose = require("mongoose");
const { Video } = require("./video.model");
const { User } = require("./user.model");

const likedVideosSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likedVideos: [
    {
      videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
      existsInLikedVideos: Boolean,
    },
  ],
});

const LikedVideos = mongoose.model("LikedVideo", likedVideosSchema);

module.exports = { LikedVideos };
