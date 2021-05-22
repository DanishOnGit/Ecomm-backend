const mongoose = require("mongoose");
const { Video } = require("./video.model");
const {Schema} = mongoose;
const playlistSchema = new Schema(
  {
    listName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    listVideos: [
      {
        videoId: {
          type: String,
          ref: "Video",
        },
        addedAt: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = { Playlist };
