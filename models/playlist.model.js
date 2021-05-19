const mongoose = require("mongoose");
const { Video } = require("./video.model");

const playlistSchema = new mongoose.Schema(
  {
    listName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    listVideos: [
      {
        videoId: {
          type: String,
          ref: "Video",
        },
        createdAt: String,
      },
    ],
  },
  {
    timeStamps: true,
  }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = { Playlist };
