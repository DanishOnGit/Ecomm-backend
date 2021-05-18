const mongoose = require("mongoose")
const {Video} = require ( "./video.model");

const playlistSchema = new mongoose.Schema({
 listName:String,
 byId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"User"
 },
 listVideos:[
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Video"
  }
 ]
  
},{
  timeStamps:true
})

const Playlist = mongoose.model("Playlist",playlistSchema)

module.exports={Playlist}