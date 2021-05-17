const mongoose = require("mongoose")
const {Video} = require ( "./video.model");

const playlistSchema = new mongoose.Schema({
  _id:String,
  listName:String,
  listVideos:[{
    videoId:{type:mongoose. Schema.Types.String,ref:Video}
  }]
  
},{
  timeStamps:true
})