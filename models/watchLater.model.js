const mongoose = require("mongoose");
const { Video } = require("./video.model");
const { User } = require("./user.model");

const watchLaterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  watchLaterVideos: [
    {
      videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
      existsInWatchLaterVideos: Boolean,
    },
  ],
});

const WatchLater = mongoose.model("WatchLaterVideo", watchLaterSchema);

module.exports = { WatchLater };
