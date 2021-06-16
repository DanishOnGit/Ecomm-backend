const mongoose = require("mongoose");
const { Schema } = mongoose;

const watchLaterVideosSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoList: [
      {
        videoId: {
          type: String,
          ref: "Video",
        },
        addedAt: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const WatchLaterVideo = mongoose.model("WatchLaterVideo", watchLaterVideosSchema);

module.exports = { WatchLaterVideo };
