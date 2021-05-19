const mongoose = require("mongoose");
const { Video } = require("./video.model");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "First name is required!",
    },
    email: {
      type: String,
      unique: "This email already exists!",
      required: "Email id is required!",
      validate: function (userEmail) {
        return /^.+@.+\.com$/.test(userEmail);
      },
    },
    password: {
      type: String,
      required: "password is required",
      validate: function (value) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
          value
        );
      },
    },
    watchHistory: [
      {
        videoId: {
          type: String,
          ref: "Video",
        },
        createdAt: {
          type: String,
        },
      },
    ],
    likedVideos: [
      {
        videoId: {
          type: String,
          ref: "Video",
        },
        createdAt: {
          type: String,
        },
      },
    ],
    watchLater: [
      {
        videoId: {
          type: String,
          ref: "Video",
        },
        createdAt: {
          type: String,
        },
      },
    ],
    // notes: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Note",
    //   },
    // ],
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
