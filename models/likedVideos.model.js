const mongoose = require("mongoose");
const { Schema } = mongoose;

const likedVideosSchema = new Schema(
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

const LikedVideo = mongoose.model("LikedVideo", likedVideosSchema);

module.exports = { LikedVideo };
