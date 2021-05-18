const mongoose = require("mongoose");
const { Video } = require("./video.model");
const { User } = require("./user.model");

const noteSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
  byId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = { Note };
