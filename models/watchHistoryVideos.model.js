const mongoose = require("mongoose");
const { Schema } = mongoose;

const watchHistoryVideosSchema = new Schema(
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

const WatchHistoryVideo = mongoose.model("WatchHistoryVideo", watchHistoryVideosSchema);

module.exports = { WatchHistoryVideo };