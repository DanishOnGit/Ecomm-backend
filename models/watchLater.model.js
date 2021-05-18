const mongoose = require("mongoose");
const { Video } = require("./video.model");
const { User } = require("./user.model");

const watchLaterSchema = new mongoose.Schema({
  byId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  videoId:{
   type: mongoose.Schema.Types.ObjectId,
   ref:"Video"
  }
});

const WatchLater = mongoose.model("WatchLaterVideo", watchLaterSchema);

module.exports = { WatchLater };
