const mongoose = require("mongoose");
const { Schema } = mongoose;

const socialUserSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      unique: "Username already taken!",
      required: "Username is required",
    },
    bio: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "SocialUser",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "SocialUser",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SocialUser = mongoose.model("SocialUser", socialUserSchema);

module.exports = { SocialUser };
