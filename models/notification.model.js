const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    actionByUserId: {
      type: Schema.Types.ObjectId,
      ref: "SocialUser",
      required: true,
    },
    notificationTitle:String,
    typeOfAction: String,
    notifyTo: {
      type: Schema.Types.ObjectId,
      ref: "SocialUser",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      default:null
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports={Notification}


