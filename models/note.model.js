const mongoose = require ("mongoose");
const {Video} = require ( "./video.model");
const {User} = require ( "./user.model");

const noteSchema = new mongoose.Schema({
  userId:{type: mongoose.Schema.Types.ObjectId,ref:"User"},
  videoId:{type:String,ref:"Video"},
  title:String,
  description:String,
  time:String

})

const Note = mongoose.model("Note",noteSchema)
module.exports = {Note}